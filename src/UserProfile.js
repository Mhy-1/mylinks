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
        <p className='pname'>{userName}</p>
        <p className='ppro'>{profession}</p>
        <p className="bio">{bio}</p>
      </div>

      {/* النص الثابت لـ morph */}
      <div className="morph-text">
        {morphTexts.join(' | ')}
      </div>

      <div className="social-links-container">
        {socialLinks.map((link, index) => (
          <div
            className="social-link"
            key={index}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-anchor"
            >
              <div className="social-icon">
                <img src={link.iconUrl} alt={link.name} />
              </div>
              <div className="social-text">{link.name}</div>
            </a>
          </div>
        ))}
      </div>



    </div>
  );
}

export default UserProfile;
