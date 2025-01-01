class ReviewModel {
  id: number;
  user_email: string;
  date: string;
  rating: number;
  bookId: number;
  review_description: string;

  constructor(
    id: number,
    user_email: string,
    date: string,
    rating: number,
    bookId: number,
    review_description: string
  ) {
    this.id = id;
    this.user_email = user_email;
    this.date = date;
    this.rating = rating;
    this.bookId = bookId;
    this.review_description = review_description;
  }
}

export default ReviewModel;
