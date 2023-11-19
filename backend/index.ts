// index.ts
import fetch from "node-fetch"

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

type Book = {
  title: string;
  authors: string[];
  description: string;
  publishedDate: string;
  selfLink: string;
  pageCount: number;
}

async function getBookInfoByTitle(title: string): Promise<Book | null> {
  try {
    // TODO: スペース区切り文字のformat
    // TODO: 複数語句での検索は「+」で繋いでいく
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(title)}`);
    const data = await response.json();
    console.log('=================================')
    console.log(data.items)

    if (data.items && data.items.length > 0) {
      const bookData = data.items[0].volumeInfo;
      const book: Book = {
        title: bookData.title,
        authors: bookData.authors || [],
        description: bookData.description || 'No description available.',
        publishedDate: "",
        selfLink: "",
        pageCount: 0
      };
      return book;
    }

    return null;
  } catch (err) {
    console.error('Error fetching book information:', err);
    return null;
  }
}

async function main() {
  const bookTitle = 'ノルウェイ'; // お好きな書名に変更してください
  const bookInfo = await getBookInfoByTitle(bookTitle);

  if (bookInfo) {
    console.log('Book Information:');
    console.log('Title:', bookInfo.title);
    console.log('Authors:', bookInfo.authors.join(', '));
    console.log('Description:', bookInfo.description);
  } else {
    console.log('Book not found.');
  }
}

main();
