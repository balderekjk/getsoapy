import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Reflect = () => {
  const [scripture, setScripture] = useState('');
  const [error, setError] = useState('');
  const bookRef = useRef();
  const chapterRef = useRef();
  const verseRef = useRef();
  const observationRef = useRef();
  const applicationRef = useRef();
  const prayerRef = useRef();
  const tagRef = useRef();
  const { currentUser } = useAuth();
  const soapsCollectionRef = collection(db, 'soaps');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let date = new Date();
    date = date.toISOString();

    if (
      scripture &&
      observationRef.current.value &&
      applicationRef.current.value &&
      prayerRef.current.value
    ) {
      try {
        await addDoc(soapsCollectionRef, {
          userId: currentUser.uid,
          scripture: scripture,
          observation: observationRef.current.value,
          application: applicationRef.current.value,
          prayer: prayerRef.current.value,
          tag: tagRef.current.value,
          date: date,
        });
        navigate('/personal');
      } catch (err) {
        throw Error(err);
      }
    } else {
      setError('A field may be empty');
    }
  };

  const getScripture = () => {
    setError('');
    if (chapterRef.current.value) {
      if (verseRef.current.value) {
        let verse = verseRef.current.value;
        let passed = /^\d{1,3}(-\d{1,3})?$/.test(verse);
        if (passed) {
          axios
            .get(
              `https://bible-api.com/${bookRef.current.value} ${chapterRef.current.value}:${verseRef.current.value}`
            )
            .then(({ data }) => {
              setScripture(
                `${data.text}${bookRef.current.value} ${chapterRef.current.value}:${verseRef.current.value}`
              );
            })
            .catch(() => {
              setError('Possible server error');
            });
        } else {
          setError('Scripture reference invalid');
        }
      } else {
        axios
          .get(
            `https://bible-api.com/${bookRef.current.value} ${chapterRef.current.value}`
          )
          .then(({ data }) => {
            setScripture(
              `${data.text} ${bookRef.current.value} ${chapterRef.current.value}`
            );
          })
          .catch(() => {
            setError('Possible server error');
          });
      }
    } else {
      setError('Scripture reference invalid');
    }
  };

  return (
    <div className="flex-ctr-h flex-ctr-v">
      <div className="card" style={{ margin: '20px 0' }}>
        <form onSubmit={handleSubmit} className="flex-ctr-v">
          <label htmlFor="book">
            <strong>Scripture</strong>
          </label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2px',
            }}
          >
            <select name="book" id="book" ref={bookRef}>
              <option value="Genesis">Genesis</option>
              <option value="Exodus">Exodus</option>
              <option value="Leviticus">Leviticus</option>
              <option value="Numbers">Numbers</option>
              <option value="Deuteronomy">Deuteronomy</option>
              <option value="Joshua">Joshua</option>
              <option value="Judges">Judges</option>
              <option value="Ruth">Ruth</option>
              <option value="1 Samuel">1 Samuel</option>
              <option value="2 Samuel">2 Samuel</option>
              <option value="1 Kings">1 Kings</option>
              <option value="2 Kings">2 Kings</option>
              <option value="1 Chronicles">1 Chronicles</option>
              <option value="2 Chronicles">2 Chronicles</option>
              <option value="Ezra">Ezra</option>
              <option value="Nehemiah">Nehemiah</option>
              <option value="Esther">Esther</option>
              <option value="Job">Job</option>
              <option value="Psalms">Psalms</option>
              <option value="Proverbs">Proverbs</option>
              <option value="Ecclesiastes">Ecclesiastes</option>
              <option value="Song of Solomon">Song of Solomon</option>
              <option value="Isaiah">Isaiah</option>
              <option value="Jeremiah">Jeremiah</option>
              <option value="Lamentations">Lamentations</option>
              <option value="Ezekiel">Ezekiel</option>
              <option value="Daniel">Daniel</option>
              <option value="Hosea">Hosea</option>
              <option value="Joel">Joel</option>
              <option value="Amos">Amos</option>
              <option value="Obadiah">Obadiah</option>
              <option value="Jonah">Jonah</option>
              <option value="Micah">Micah</option>
              <option value="Nahum">Nahum</option>
              <option value="Habakkuk">Habakkuk</option>
              <option value="Zephaniah">Zephaniah</option>
              <option value="Haggai">Haggai</option>
              <option value="Zechariah">Zechariah</option>
              <option value="Malachi">Malachi</option>
              <option value="Matthew">Matthew</option>
              <option value="Mark">Mark</option>
              <option value="Luke">Luke</option>
              <option value="John">John</option>
              <option value="Acts">Acts</option>
              <option value="Romans">Romans</option>
              <option value="1 Corinthians">1 Corinthians</option>
              <option value="2 Corinthians">2 Corinthians</option>
              <option value="Galatians">Galatians</option>
              <option value="Ephesians">Ephesians</option>
              <option value="Philippians">Philippians</option>
              <option value="Colossians">Colossians</option>
              <option value="1 Thessalonians">1 Thessalonians</option>
              <option value="2 Thessalonians">2 Thessalonians</option>
              <option value="1 Timothy">1 Timothy</option>
              <option value="2 Timothy">2 Timothy</option>
              <option value="Titus">Titus</option>
              <option value="Philemon">Philemon</option>
              <option value="Hebrews">Hebrews</option>
              <option value="James">James</option>
              <option value="1 Peter">1 Peter</option>
              <option value="2 Peter">2 Peter</option>
              <option value="1 John">1 John</option>
              <option value="2 John">2 John</option>
              <option value="3 John">3 John</option>
              <option value="Jude">Jude</option>
              <option value="Jude">Jude</option>
            </select>
            <input
              type="number"
              placeholder="ch."
              min="1"
              max="150"
              style={{ width: '40px' }}
              ref={chapterRef}
            />
            <input
              type="text"
              placeholder="verse(s)"
              style={{ width: '48px' }}
              ref={verseRef}
            />
            <button onClick={getScripture} type="button">
              Get
            </button>
          </div>
          <textarea
            id="scripture"
            type="text"
            placeholder="Preview scripture here"
            rows="5"
            value={scripture && scripture}
            disabled
          ></textarea>
          <label htmlFor="observation">
            <strong>Observation</strong>
          </label>
          <textarea
            id="observation"
            type="text"
            placeholder="Record observation here"
            rows="5"
            ref={observationRef}
          ></textarea>
          <label htmlFor="application">
            <strong>Application</strong>
          </label>
          <textarea
            id="application"
            type="text"
            placeholder="Personal application here"
            rows="5"
            ref={applicationRef}
          ></textarea>
          <label htmlFor="prayer">
            <strong>Prayer</strong>
          </label>
          <textarea
            id="prayer"
            type="text"
            placeholder="Your prayer here"
            rows="5"
            ref={prayerRef}
          ></textarea>
          <div>
            <strong>Tag:</strong>{' '}
            <select name="tags" id="tags" ref={tagRef}>
              <option value="None">None</option>
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
          </div>
          <p style={{ background: 'red', color: 'white' }}>{error}</p>
          <button className="btn-prime" type="submit">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reflect;
