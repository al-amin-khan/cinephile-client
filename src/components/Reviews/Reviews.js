import React, { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from '../ReviewForm/ReviewForm';
import api from '../../api/axiosConfig';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    const revText = useRef();
    let params = useParams();


    const movieId = params.movieId;

    useEffect(() => {
      getMovieData(movieId);
    },[])

    const addReview = async (e) => {
      e.preventDefault();

      const rev = revText.current;

      try {
        const response = await api.post("/api/v1/reviews", {reviewBody: rev.value, imdbId: movieId});
        const updatedReview = [...reviews, {body: rev.value}];
        rev.value = "";

      setReviews(updatedReview);

      } catch (error) {
        console.error(error);
      }
    };
    
    return (
       <Container>
        <Row>
            <Col>
              <h3>Reviews</h3>
            </Col>
        </Row>

        <Row className='mt-2' key={movieId}>
            <Col>
              <img src={movie?.poster} alt={movie.title}/>
            </Col>
            <Col>
              {
                <>
                  <div key={movieId}>
                    <Row>
                      <Col>
                        <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review?" />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                    </Row>
                  </div>
                </>
              }
              {
                reviews?.map((r) => {
                  return (
                    <>
                      <Row key={movieId}>
                        <Col>{r.body}</Col>
                      </Row>
                      <Row>
                        <Col>
                          <hr />
                        </Col>
                      </Row>
                    </>
                  )
                })
              }
            </Col>
        </Row>
       </Container>
    );
};

export default Reviews;