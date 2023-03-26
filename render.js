const text = document.querySelector('#mytext');

window.api.test((event, _args) => {
	const content = text.value;
	console.log(content);
	event.sender.send('save', content);
});

window.api.openFile((_event, args) => {
	text.innerHTML = args;
});
