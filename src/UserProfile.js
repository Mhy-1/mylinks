import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

function UserProfile() {
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [morphTexts, setMorphTexts] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const userDetailsRef = doc(db, 'profile', 'userDetails');
    const unsubscribe = onSnapshot(userDetailsRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setProfileImage(data.profileImage || '');
        setUserName(data.name || '');
        setProfession(data.profession || '');
        setBio(data.bio || '');
        setMorphTexts(data.morphTexts ? data.morphTexts.split(' | ') : []);
        setSocialLinks(data.socialLinks || []);
      }
    });

    // قم بإلغاء الاشتراك في التحديثات عند عدم الحاجة للمكون
    return () => unsubscribe();
  }, []);

  return (
    <div className="user-profile">
      <div className="animated-background">
        <div id="stars1"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <div id="profilePicture">
        {profileImage && <img src={profileImage} alt="Profile" />}
      </div>

      <div id="userName">
        <p>{userName}</p>
        <p>{profession}</p>
        <p className="bio">{bio}</p>
      </div>

      {/* النص الثابت لـ morph */}
      <div className="morph-text">
        {morphTexts.join(' | ')}
      </div>

      <div className="flexc">
        <div className="coverbox">
          <div className="rowlinks">
            {socialLinks.map((link, index) => (
              <div className="links" key={index}>
                <a className="link" href={link.url} target="_blank" rel="noopener noreferrer">
                  <img src={link.iconUrl} alt={link.name} style={{ width: '1.5em', height: '1.5em', verticalAlign: 'middle', marginRight: '1em' }} />
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
