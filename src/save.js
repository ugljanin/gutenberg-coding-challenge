/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Preview from './preview';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param {Object} props Block properties
 * @return {WPElement} Element to render.
 */
export default function Save( props ) {
	const { attributes } = props;
	const blockProps = useBlockProps.save();
	return (
		<div { ...blockProps }>
			<Preview { ...attributes } />
		</div>
	);
}
