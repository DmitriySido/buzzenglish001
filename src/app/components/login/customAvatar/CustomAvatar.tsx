'use client';
import './customAvatar.scss'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import initialBody from '../../../../../public/customAvatar/body/body1-blue.png'
import initialEyes from '../../../../../public/customAvatar/eyes/eyes1-blue.png';

import Body1Blue from '../../../../../public/customAvatar/body/body1-blue.png';
import Body2Blue from '../../../../../public/customAvatar/body/body2-blue.png';
import Body3Blue from '../../../../../public/customAvatar/body/body3-blue.png';

import Body1Green from '../../../../../public/customAvatar/body/body1-green.png';
import Body2Green from '../../../../../public/customAvatar/body/body2-green.png';
import Body3Green from '../../../../../public/customAvatar/body/body3-green.png';

import Eyes1Blue from '../../../../../public/customAvatar/eyes/eyes1-blue.png';
import Eyes2Green from '../../../../../public/customAvatar/eyes/eyes2-green.png';
import Eyes3Brown from '../../../../../public/customAvatar/eyes/eyes3-brown.png';

export default function Home() {

  const bodyArray = [
    Body1Blue, Body2Blue, Body3Blue,
    Body1Green, Body2Green, Body3Green,
  ];

  const EyesArray = [
    Eyes1Blue, Eyes2Green, Eyes3Brown
  ];


  const [currentBody, setCurrentBody] = useState<string>(initialBody.src);
  const [currentEyes, setCurrentEyes] = useState<string>(initialEyes.src);


  useEffect(() => {
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) {
      const avatar = JSON.parse(savedAvatar);
      setCurrentBody(avatar.body);
      setCurrentEyes(avatar.eye);
    }
  }, []);


  useEffect(() => {
    const avatar = {
      body: currentBody,
      eye: currentEyes,
    };
    localStorage.setItem('avatar', JSON.stringify(avatar));
  }, [currentBody, currentEyes]);


  const handleChange = (change: string, func: any) => func(change)

  return (
    <div className='custom-avatar__wrapper'>
    <div className='main-foto'>
      <Image
        className='custom-body'
        src={currentBody}
        width={100}
        height={100}
        alt="Picture of the author"
      />
      <Image
        className='custom-eyes'
        src={currentEyes}
        width={90}
        height={90}
        alt="Picture of the author"
      />
    </div>
  
    <h2 className='custom-avatar-title first'>Тело</h2>
    <ul className='list-body'>
      {bodyArray.map((body, index) => (
        <button type='button' key={index + 'body'} className='avatar-button-select' onClick={() => handleChange(body.src, setCurrentBody)}>
          <Image
            className='custom-body__button'
            src={body.src}
            width={90}
            height={90}
            alt="Picture Body"
          />
        </button>
      ))}
    </ul>
  
    <h2 className='custom-avatar-title'>Глаза</h2>
    <ul className='list-eyes'>
      {EyesArray.map((eyes, index) => (
        <button type='button' key={index + 'eye'} className='avatar-button-select' onClick={() => handleChange(eyes.src, setCurrentEyes)}>
          <Image
            className='custom-eyes__button'
            src={eyes.src}
            width={90}
            height={90}
            alt="Picture Eye"
          />
        </button>
      ))}
    </ul>
  </div>
  );
}