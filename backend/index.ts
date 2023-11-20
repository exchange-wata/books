// index.ts
import fetch from "node-fetch"

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

type Book = {
  title: string;
  authors: string[]
}

// TODO: スペース区切り文字のformat→スペースの種類対応が必須かも？
// TODO: 複数語句での検索は「+」で繋いでいく
const createQueryParam = (param: string): string => param.replace(' ', '+')

// データ取得のみ
const getBookInfoByTitle = async (queryParams: string): Promise<Book | null> => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(queryParams)}`);
    return response.json();
  } catch (err) {
    console.error('Error fetching book information:', err);
    return null;
  }
}

// データ加工のみ
// TODO: 引数の型
const format = async (data: any) => {
  const allBookInfo = data.items;
  if (allBookInfo && allBookInfo.length > 0) {
    return allBookInfo.map((each: any) => {
      const bookInfo = each.volumeInfo;
      return ({
        title: bookInfo.title,
        authors: [...bookInfo.authors] || []
      })
  })
}}

export async function main() {
  const bookTitle = '江國'; // お好きな書名に変更してください
  const queryParams = createQueryParam(bookTitle)
  const bookInfo = await getBookInfoByTitle(queryParams);
  console.log(format(bookInfo))
  return format(bookInfo);

  // if (bookInfo) {
  //   console.log('Book Information:');
  //   console.log('Title:', bookInfo.title);
  //   console.log('Authors:', bookInfo.authors.join(', '));
  //   console.log('Description:', bookInfo.description);
  // } else {
  //   console.log('Book not found.');
  // }
}

main();
