class ReviewModel {
  id: number;
  userEmail: string;
  date: string;
  rating: number;
  bookId: number;
  review_description: string;

  constructor(
    id: number,
    userEmail: string,
    date: string,
    rating: number,
    bookId: number,
    review_description: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.date = date;
    this.rating = rating;
    this.bookId = bookId;
    this.review_description = review_description;
  }
}

export default ReviewModel;
