import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './QnA_components/Search';
import QuestionList from './QnA_components/QuestionList';
import NewQuestion from './QnA_components/NewQuestion';

const QuestionsAnswers = ({ currentItem }) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [questions, setQuestions] = useState({
    results: [],
    moreQuestions: [],
    product_id: null,
  });

  const handleMoreQuestions = () => {
    setQuestions({
      results: questions.results.concat(questions.moreQuestions.slice(0, 4)),
      moreQuestions: questions.moreQuestions.slice(4),
    });
  };

  useEffect(() => {
    axios.get('/api/qa/questions/')
      .then((response) => {
        console.log(response.data);
        setQuestions({
          results: response.data.results.slice(0, 4),
          moreQuestions: response.data.results.slice(4),
          product_id: response.product_id,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h3>Questions & Answers</h3>
      <div className="Search">
        <Search />
      </div>
      <div className="questionList">
        {questions.results.map((question) => (
          <QuestionList question={question} key={question.question_id} product={currentItem} />
        ))}
      </div>
      {!questions.moreQuestions.length < 1 ? <input type="button" value="More Answered Questions" onClick={handleMoreQuestions} /> : null}
      <input type="button" value="Add Question +" onClick={() => setQuestionModal(true)} />
      <NewQuestion show={questionModal} onHide={() => setQuestionModal(false)} questions={questions.product_id} product={currentItem} />
    </div>
  );
};

export default QuestionsAnswers;
