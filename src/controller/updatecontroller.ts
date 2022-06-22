export function Update(book: any[], newbook: any) {
	const contactIndex = book.findIndex((el) => el.id === newbook.id);
    
    book[contactIndex] = {
			...book[contactIndex],
			...newbook,
		};
	
	return book;
}