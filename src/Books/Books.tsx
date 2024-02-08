import { Col, Row, Spin } from 'antd';
import { useEffect } from 'react';
import { bookSelectors, fetchBooks } from '../HandleBooks/booksSlice';
import '../common-style/CommonStyle.css';
import { ErrorPage } from '../components/ErrorPage';
import { useAppDispatch, useAppSelector } from '../store';
import { BookCard } from './BookCard';

const Books: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.books.loading);
    const error = useAppSelector((state) => state.books.error);
    const books = useAppSelector(bookSelectors.selectAll);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (error) {
        return <ErrorPage
            title="Books"
            subTitle="Errore nel caricamento dei libri dallo store" />
    }

    return <>{loading
        ? <div className="full-page">
            <Spin
                spinning={loading}
                size="large"
            />
        </div>
        : <Row gutter={6}>
            {books.map((book) =>
                <Col key={book.id}>
                    <BookCard key={book.id} book={book} />
                </Col>)}
        </Row>}</>;
}

export default Books;