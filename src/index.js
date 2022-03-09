/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

const { name } = metadata;
const settings = {
	edit: Edit,
	save: Save,
};

registerBlockType( name, settings );
