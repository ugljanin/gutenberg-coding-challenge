/**
 * WordPress dependencies
 */
import { edit, globe } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import './editor.scss';
import { getEmojiFlag } from './utils';
import Preview from './preview';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} props Block properties
 * @return {WPElement} Element to render.
 */

export default function Edit( { attributes, setAttributes } ) {
	const { countryCode, relatedPosts } = attributes;

	const postId = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostId();
	} );

	const options = Object.keys( countries ).map( ( code ) => ( {
		value: code,
		label: `${ getEmojiFlag( code ) } ${ countries[ code ] } — ${ code }`,
	} ) );

	const [ isPreview, setPreview ] = useState();

	useEffect( () => setPreview( countryCode ), [ countryCode ] );

	const handleChangeCountry = () => {
		if ( isPreview ) setPreview( false );
		else if ( countryCode ) setPreview( true );
	};

	const handleChangeCountryCode = ( newCountryCode ) => {
		if ( newCountryCode && countryCode !== newCountryCode ) {
			setAttributes( {
				countryCode: newCountryCode,
				relatedPosts: [],
			} );
		}
	};

	useEffect( () => {
		async function getRelatedPosts() {
			const response = await window.fetch(
				`/wp-json/wp/v2/posts?search=${ countries[ countryCode ] }&exclude=${ postId }`
			);

			if ( ! response.ok )
				throw new Error( `HTTP error! Status: ${ response.status }` );

			const posts = await response.json();

			setAttributes( {
				relatedPosts:
					posts?.map( ( relatedPost ) => ( {
						...relatedPost,
						title: relatedPost.title?.rendered || relatedPost.link,
						excerpt: relatedPost.excerpt?.rendered || '',
					} ) ) || [],
			} );
		}

		getRelatedPosts();
	}, [ countryCode, postId, setAttributes ] );

	return (
		<div { ...useBlockProps() }>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Country', 'xwp-country-card' ) }
						icon={ edit }
						onClick={ handleChangeCountry }
						disabled={ ! Boolean( countryCode ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div className="components-wrapper">
				<Placeholder
					icon={ globe }
					label={ __( 'XWP Country Card', 'xwp-country-card' ) }
					isColumnLayout={ true }
					instructions={ __(
						'Type in a name of a country you want to display on you site.',
						'xwp-country-card'
					) }
				>
					<ComboboxControl
						label={ __( 'Country', 'xwp-country-card' ) }
						hideLabelFromVision
						options={ options }
						value={ countryCode }
						onChange={ handleChangeCountryCode }
						allowReset={ true }
					/>
				</Placeholder>
				<Preview
					countryCode={ countryCode }
					relatedPosts={ relatedPosts }
				/>
			</div>
		</div>
	);
}
