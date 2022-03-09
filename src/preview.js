/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import continentNames from '../assets/continent-names.json';
import continents from '../assets/continents.json';
import { getEmojiFlag } from './utils';

/**
 * The Preview function defines the selected country output to
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {string} countryCode Country Code
 * @return {WPElement} Element to render.
 */
export default function Preview( { countryCode, relatedPosts } ) {
	if ( ! countryCode ) return null;

	const emojiFlag = getEmojiFlag( countryCode ),
		hasRelatedPosts = relatedPosts?.length > 0;

	return (
		<div className="xwp-country-card">
			<div
				className="xwp-country-card__media"
				data-emoji-flag={ emojiFlag }
			>
				<div className="xwp-country-card-flag">{ emojiFlag }</div>
			</div>
			<h3 className="xwp-country-card__heading">
				{ __( 'Hello from', 'xwp-country-card' ) }{ ' ' }
				<strong>{ countries[ countryCode ] }</strong> (
				<span className="xwp-country-card__country-code">
					{ countryCode }
				</span>
				), { continentNames[ continents[ countryCode ] ] }!
			</h3>
			<div className="xwp-country-card__related-posts">
				<h3 className="related-posts__heading">
					{ hasRelatedPosts
						? sprintf(
								/* translators: %d is replaced with the number of related posts */
								_n(
									'There is %d related post:',
									'There are %d related posts:',
									relatedPosts.length,
									'xwp-country-card'
								),
								relatedPosts.length
						  )
						: __(
								'There are no related posts.',
								'xwp-country-card'
						  ) }
				</h3>
				{ hasRelatedPosts && (
					<ul className="related-posts__list">
						{ relatedPosts.map( ( relatedPost, index ) => (
							<li key={ index } className="related-posts__post">
								<a
									className="link"
									href={ relatedPost.link }
									data-post-id={ relatedPost.id }
								>
									<h3 className="title">
										{ relatedPost.title }
									</h3>
									<p className="excerpt">
										{ relatedPost.excerpt }
									</p>
								</a>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</div>
	);
}
