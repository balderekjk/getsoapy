import React from 'react';

const Welcome = () => {
  return (
    <div className="flex-ctr-h flex-ctr-v">
      <div className="card" style={{ margin: '20px 0' }}>
        <p style={{ margin: '8px 0' }}>
          What is a <strong>SOAP</strong>?
        </p>
        <p>
          <strong>SOAP</strong> is a way to journal with Biblical scripture.
        </p>
        <p>
          The <strong>S</strong> stands for <strong>Scripture</strong>:
          <br />
          Select a scripture from your daily reading.
        </p>
        <p>
          The <strong>O</strong> for <strong>Observation</strong>:
          <br /> What resonates with you from the passage?
        </p>
        <p>
          The <strong>A</strong> is for <strong>Application</strong>:
          <br /> How can you apply this scripture today? Everyday?
        </p>
        <p>
          The <strong>P</strong> means <strong>Prayer</strong>:
          <br /> Write a heartfelt prayer asking for God's grace, wisdom, and
          integrity to follow through with your application.
        </p>
        Be jubilant in continuing your day.
      </div>
    </div>
  );
};

export default Welcome;
