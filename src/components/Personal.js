import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  doc,
  deleteDoc,
  startAfter,
  endBefore,
  limitToLast,
} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import './Personal.module.css';

const Personal = ({ editable }) => {
  const [soaps, setSoaps] = useState([]);
  const [error, setError] = useState('');
  const [last, setLast] = useState('');
  const [first, setFirst] = useState('');
  const tagRef = useRef();
  const [isCancelOpt, setIsCancelOpt] = useState('');
  const soapsCollectionRef = collection(db, 'soaps');
  const { currentUser } = useAuth();
  const [currentUId, setCurrentUId] = useState('0');

  const getSoaps = async () => {
    if (currentUser) {
      setCurrentUId(currentUser.uid);
    } else {
      setCurrentUId('0');
    }
    let data;
    setSoaps([]);
    if (editable) {
      data = await getDocs(
        query(
          soapsCollectionRef,
          where('userId', '==', currentUId),
          orderBy('date', 'desc'),
          limit(10)
        )
      );
      if (data.size) {
        setLast(data.docs[data.docs.length - 1].data().date);
        setFirst(data.docs[0].data().date);
      }
    } else {
      data = await getDocs(
        query(soapsCollectionRef, orderBy('date', 'desc'), limit(12))
      );
    }
    setSoaps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getSoaps();
  }, [editable, currentUId]);

  const setErrorTimer = (err) => {
    setError(err);
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, 'soaps', docId));
    } catch (err) {
      throw Error(err);
    }
  };

  const handlePaginate = async (direction) => {
    let data;
    if (direction === '>') {
      try {
        data = await getDocs(
          query(
            soapsCollectionRef,
            where('userId', '==', currentUId),
            orderBy('date', 'desc'),
            startAfter(last),
            limit(10)
          )
        );
      } catch (err) {
        throw Error(err);
      }
    } else {
      try {
        data = await getDocs(
          query(
            soapsCollectionRef,
            where('userId', '==', currentUId),
            orderBy('date', 'desc'),
            endBefore(first),
            limitToLast(10)
          )
        );
      } catch (err) {
        throw Error(err);
      }
    }
    if (data.size) {
      setLast(data.docs[data.docs.length - 1].data().date);
      setFirst(data.docs[0].data().date);
      setSoaps([]);
      setSoaps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      setErrorTimer('None down yonder');
    }
  };

  const handleFilter = async () => {
    let data;
    if (tagRef.current.value !== 'Default') {
      if (editable) {
        data = await getDocs(
          query(
            soapsCollectionRef,
            where('tag', '==', tagRef.current.value),
            where('userId', '==', currentUId),
            orderBy('date', 'desc'),
            limit(10)
          )
        );
      } else {
        data = await getDocs(
          query(
            soapsCollectionRef,
            where('tag', '==', tagRef.current.value),
            orderBy('date', 'desc'),
            limit(10)
          )
        );
      }
      if (data.docs.length) {
        setSoaps([]);
        setSoaps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        setErrorTimer('No results found');
      }
    } else {
      getSoaps();
    }
  };

  return (
    <div className="flex-ctr-h flex-ctr-v">
      <div style={{ marginTop: '20px', fontSize: '0.9em', fontWeight: '600' }}>
        Search by tag:{' '}
        <select name="tags" id="tags" ref={tagRef}>
          <option value="None">None</option>
          <option value="Default">Default</option>
          <option value="Awe">Awe</option>
          <option value="Build Up">Build Up</option>
          <option value="Charity">Charity</option>
          <option value="Compassion">Compassion</option>
          <option value="Contentedness">Contentedness</option>
          <option value="Conversation">Conversation</option>
          <option value="Cooperation">Cooperation</option>
          <option value="Courage">Courage</option>
          <option value="Creativity">Creativity</option>
          <option value="Diligence">Diligence</option>
          <option value="Earnestness">Earnestness</option>
          <option value="Encourage">Encourage</option>
          <option value="Family">Family</option>
          <option value="Faithfulness">Faithfulness</option>
          <option value="Fellowship">Fellowship</option>
          <option value="Follow">Follow</option>
          <option value="Forgiveness">Forgiveness</option>
          <option value="Friendship">Friendship</option>
          <option value="Generosity">Generosity</option>
          <option value="Gentleness">Gentleness</option>
          <option value="Grace">Grace</option>
          <option value="Gratefulness">Gratefulness</option>
          <option value="Honesty">Honesty</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Humility">Humility</option>
          <option value="Integrity">Integrity</option>
          <option value="Joy">Joy</option>
          <option value="Kindness">Kindness</option>
          <option value="Listening">Listening</option>
          <option value="Love">Love</option>
          <option value="Mercy">Mercy</option>
          <option value="Nurture">Nurture</option>
          <option value="Obedience">Obedience</option>
          <option value="Patience">Patience</option>
          <option value="Perseverance">Perseverance</option>
          <option value="Peace">Peace</option>
          <option value="Prayer">Prayer</option>
          <option value="Quiet">Quiet</option>
          <option value="Reliability">Reliability</option>
          <option value="Repentance">Repentance</option>
          <option value="Respect">Respect</option>
          <option value="Responsibility">Responsibility</option>
          <option value="Reverence">Reverence</option>
          <option value="Sacrifice">Sacrifice</option>
          <option value="Self-Control">Self-Control</option>
          <option value="Service">Service</option>
          <option value="Sorrow">Sorrow</option>
          <option value="Strength">Strength</option>
          <option value="Tithing">Tithing</option>
          <option value="Understanding">Understanding</option>
          <option value="Vigilance">Vigilance</option>
          <option value="Wisdom">Wisdom</option>
          <option value="Worship">Worship</option>
        </select>
        <button onClick={handleFilter} style={{ marginLeft: '2px' }}>
          Go
        </button>
      </div>
      {error && <div style={{ fontSize: '0.9em' }}>{error}...</div>}
      {soaps.map((soap) => {
        return (
          <div
            key={soap.id}
            className="card"
            style={{
              margin: '20px 0',
              fontSize: '0.9em',
            }}
          >
            <p style={{ margin: '0' }}>
              <strong>Scripture:</strong>
              <br /> {soap.scripture}
            </p>
            <p>
              <strong>Observation:</strong>
              <br /> {soap.observation}
            </p>
            <p>
              <strong>Application:</strong>
              <br /> {soap.application}
            </p>
            <p>
              <strong>Prayer:</strong>
              <br /> {soap.prayer}
            </p>
            {soap.tag !== 'None' && <p>Tag: {soap.tag}</p>}
            <hr style={{ width: '100%', border: '1px solid darkgrey' }} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p>{soap.date.substring(0, 10)} (UTC)</p>
              {editable && (
                <>
                  {isCancelOpt === soap.id && (
                    <button
                      onClick={() => setIsCancelOpt('')}
                      style={{
                        border: '1px solid blue',
                        color: 'hsl(239, 100%, 25%)',
                      }}
                    >
                      CANCEL
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      isCancelOpt === soap.id &&
                        handleDelete(soap.id) &&
                        e.target.parentNode.parentNode.remove();
                      setIsCancelOpt(soap.id);
                    }}
                    style={{
                      background: isCancelOpt === soap.id ? 'red' : 'orangered',
                      border: '1px solid blue',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    DELETE
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
      {editable && (
        <div
          style={{
            display: 'flex',
            width: '50vw',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <button onClick={() => handlePaginate('<')}>{'<'}</button>
          <div style={{ fontSize: '0.8em' }}>{error && error}</div>
          <button onClick={() => handlePaginate('>')}>{'>'}</button>
        </div>
      )}
    </div>
  );
};

export default Personal;
