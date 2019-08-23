const visit = require('unist-util-visit');

const defaults = {
	width: 800,
	height: null,
	preload: false,
	muted: false,
	autoplay: false,
	loop: false,
	controls: true,
	playsinline: true,
};

const addVideo = ({ markdownAST }, pluginOptions) => {

	const options = Object.assign({}, defaults, pluginOptions);

	visit(markdownAST, 'inlineCode', (node) => {
		const { value } = node;
		const matches = value.match(/video:?\s(.*)+/i);

		if(matches) {
			const url = matches[1].trim();

			node.type = 'html';
			node.value = renderVideoTag(url, options);
		}
	});

};

const renderVideoTag = (url, options) => {

	const videoNode = `
		<video
			src=${url}
			width="${options.width}"
			height="${options.height}"
			preload="${options.preload}"
			muted="${options.muted}"
			${options.autoplay ? 'autoplay' : ''}
			${options.loop ? 'loop' : ''}
			${options.controls ? 'controls' : ''}
			
			${options.playsinline ? 'playsinline webkit-playsinline' : ''}
		></video>
	`;

	return videoNode;
};

module.exports = addVideo;
