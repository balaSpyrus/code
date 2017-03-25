var library = [ 
{ author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
{ author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
{ author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
];

for (var i = 0; i < library.length; i++) {
	for (var j = i+1; j < library.length; j++) {
		if(library[i].title.charAt(0)>library[j].title.charAt(0))
		{
			var temp=library[i];
			library[i]=library[j];
			library[j]=temp;
		}
	}
}
console.log(library);