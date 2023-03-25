window.api.test((event, _args) => {
	const text = document.querySelector('#mytext');
	const content = text.value;
	console.log(content);
	event.sender.send('save', content);
});
