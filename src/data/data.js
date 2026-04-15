// INTRO AGES
import img4049 from "../assets/img/intro/img4049.png";
import img5059 from "../assets/img/intro/img5059.png";
import img6069 from "../assets/img/intro/img6069.png";
import img70 from "../assets/img/intro/img70.png";

import highlight4049 from "../assets/img/intro/highlight4049.png";
import highlight5059 from "../assets/img/intro/highlight5059.png";
import highlight6069 from "../assets/img/intro/highlight6069.png";
import highlight70 from "../assets/img/intro/highlight70.png";

// TAICHI AGES
import imgQuiz3039 from "../assets/img/taichi/imgQuiz3039.png";
import imgQuiz4049 from "../assets/img/taichi/imgQuiz4049.png";
import imgQuiz5059 from "../assets/img/taichi/imgQuiz5059.png";
import imgQuiz60 from "../assets/img/taichi/imgQuiz60.png";

import imgQuizHighlight3039 from "../assets/img/taichi/imgQuizHighlight3039.png";
import imgQuizHighlight4049 from "../assets/img/taichi/imgQuizHighlight4049.png";
import imgQuizHighlight5059 from "../assets/img/taichi/imgQuizHighlight5059.png";
import imgQuizHighlight60 from "../assets/img/taichi/imgQuizHighlight60.png";

// QUIZ IMAGES (MALE)
import maleImg from "../assets/img/quiz/maleImg.png";
import femaleImg from "../assets/img/quiz/femaleImg.png";

import slimImgMale from "../assets/img/quiz/male/slimImgMale.webp";
import averageImgMale from "../assets/img/quiz/male/averageImgMale.webp";
import heavyImgMale from "../assets/img/quiz/male/heavyImgMale.webp";

import fewImgMale from "../assets/img/quiz/male/fewImgMale.webp";
import fitImgMale from "../assets/img/quiz/male/fitImgMale.webp";
import athleticImgMale from "../assets/img/quiz/male/athleticImgMale.webp";

import chestMale from "../assets/img/quiz/male/chestMale.webp";
import armsMale from "../assets/img/quiz/male/armsMale.png";
import bellyMale from "../assets/img/quiz/male/bellyMale.webp";
import legsMale from "../assets/img/quiz/male/legsMale.png";

import quizModelImg1Male from "../assets/img/quiz/male/quizModelImg1Male.webp";
import quizModelImg2Male from "../assets/img/quiz/male/quizModelImg2Male.webp";
import quizModelImg3Male from "../assets/img/quiz/male/quizModelImg3Male.webp";

import shoulderMale from "../assets/img/quiz/male/shoulderMale.webp";
import backMale from "../assets/img/quiz/male/backMale.webp";
import elbowMale from "../assets/img/quiz/male/elbowMale.webp";
import kneeMale from "../assets/img/quiz/male/kneeMale.webp";
import ankleMale from "../assets/img/quiz/male/ankleMale.webp";
import noneAboveMale from "../assets/img/quiz/male/noneAboveMale.webp";

// QUIZ IMAGES (FEMALE)
import slimImgFemale from "../assets/img/quiz/female/slimImgFemale.webp";
import averageImgFemale from "../assets/img/quiz/female/averageImgFemale.webp";
import heavyImgFemale from "../assets/img/quiz/female/heavyImgFemale.webp";

import fewImgFemale from "../assets/img/quiz/female/fewImgFemale.webp";
import fitImgFemale from "../assets/img/quiz/female/fitImgFemale.webp";
import athleticImgFemale from "../assets/img/quiz/female/athleticImgFemale.webp";

import chestFemale from "../assets/img/quiz/female/chestFemale.webp";
import armsFemale from "../assets/img/quiz/female/armsFemale.webp";
import bellyFemale from "../assets/img/quiz/female/bellyFemale.webp";
import legsFemale from "../assets/img/quiz/female/legsFemale.png";

import quizModelImg1Female from "../assets/img/quiz/female/quizModelImg1Female.webp";
import quizModelImg2Female from "../assets/img/quiz/female/quizModelImg2Female.webp";
import quizModelImg3Female from "../assets/img/quiz/female/quizModelImg3Female.webp";

import shoulderFemale from "../assets/img/quiz/female/shoulderFemale.webp";
import backFemale from "../assets/img/quiz/female/backFemale.webp";
import elbowFemale from "../assets/img/quiz/female/elbowFemale.webp";
import kneeFemale from "../assets/img/quiz/female/kneeFemale.webp";
import ankleFemale from "../assets/img/quiz/female/ankleFemale.webp";
import noneAboveFemale from "../assets/img/quiz/female/noneAboveFemale.webp";

import icon1 from "../assets/img/quiz/icon1.png";
import icon2 from "../assets/img/quiz/icon2.png";
import icon3 from "../assets/img/quiz/icon3.png";
import icon4 from "../assets/img/quiz/icon4.png";
import icon5 from "../assets/img/quiz/icon5.png";
import icon6 from "../assets/img/quiz/icon6.png";
import icon7 from "../assets/img/quiz/icon7.png";
import icon8 from "../assets/img/quiz/icon8.png";
import icon9 from "../assets/img/quiz/icon9.png";

export const ages = [
  { id: 1, age: img4049, highlight: highlight4049 },
  { id: 2, age: img5059, highlight: highlight5059 },
  { id: 3, age: img6069, highlight: highlight6069 },
  { id: 4, age: img70, highlight: highlight70 },
];

export const taichiAge = [
  { id: 1, age: imgQuiz3039, highlight: imgQuizHighlight3039 },
  { id: 2, age: imgQuiz4049, highlight: imgQuizHighlight4049 },
  { id: 3, age: imgQuiz5059, highlight: imgQuizHighlight5059 },
  { id: 4, age: imgQuiz60, highlight: imgQuizHighlight60 },
];

// QUIZ

export const quiz = [
  // 1
  {
    id: "gender",
    question: "Choose your gender",
    choices: [
      { id: "male", text: "Male", img: maleImg },
      { id: "female", text: "Female", img: femaleImg },
    ],
    layout: "list1",
    className: {
      btn: "h-[285px] pl-[50px]",
      btnContainer: "gap-8",
    },
  },
  // 2
  {
    id: "body_type",
    question: "Choose your body type",
    choicesByGender: {
      male: [
        { id: "slim", text: "Slim", img: slimImgMale },
        { id: "average", text: "Average", img: averageImgMale },
        { id: "heavy", text: "Heavy", img: heavyImgMale },
      ],
      female: [
        { id: "slim", text: "Slim", img: slimImgFemale },
        { id: "average", text: "Average", img: averageImgFemale },
        { id: "heavy", text: "Heavy", img: heavyImgFemale },
      ],
    },
    layout: "list1",
    className: {
      btnContainer: "gap-8",
    },
  },
  // 3
  {
    id: "goal",
    question: "Choose your goal",
    choices: [
      { id: "lose", text: "Lose weight" },
      { id: "longevity", text: "Wellness and Longevity" },
      { id: "energy", text: "Energy and vitality" },
      { id: "mobility", text: "Balance and mobility" },
    ],
    imageByGender: {
      male: quizModelImg1Male,
      female: quizModelImg1Female,
    },
    layout: "list1",
    className: {
      btn: "h-[220px] pl-[50px]",
      btnContainer: "gap-8",
      modelImage: "w-[90%]",
    },
  },
  // 4
  {
    id: "body_result",
    question: "Choose the body you want",
    choicesByGender: {
      male: [
        { id: "few", text: "A few sizes \n smaller", img: fewImgMale },
        { id: "fit", text: "Fit", img: fitImgMale },
        { id: "athletic", text: "Athletic", img: athleticImgMale },
      ],
      female: [
        { id: "few", text: "A few sizes \n smaller", img: fewImgFemale },
        { id: "fit", text: "Fit", img: fitImgFemale },
        { id: "athletic", text: "Athletic", img: athleticImgFemale },
      ],
    },
    layout: "list1",
    className: {
      btnContainer: "gap-8",
    },
  },
  // 5
  {
    id: "problem_areas",
    question: "Select problem areas",
    option: "multiple",
    choicesByGender: {
      male: [
        { id: "Chest", text: "Chest", img: chestMale },
        { id: "Arms", text: "Arms", img: armsMale },
        { id: "Belly", text: "Belly", img: bellyMale },
        { id: "Legs", text: "Legs", img: legsMale },
      ],
      female: [
        { id: "Chest", text: "Chest", img: chestFemale },
        { id: "Arms", text: "Arms", img: armsFemale },
        { id: "Belly", text: "Belly", img: bellyFemale },
        { id: "Legs", text: "Legs", img: legsFemale },
      ],
    },
    layout: "list2",
    className: {
      btn: "pr-[70px] pl-[50px]",
      btnContainer: "gap-8",
    },
  },
  // 6
  {
    id: "best_shape",
    question: "How long ago were you in the best shape of your life?",
    choicesByGender: {
      male: [
        {
          id: "Rightnow",
          text: "Right now!",
          response: {
            title: "Wow! This is better than 89% of users!",
            body: "Let's maintain your beautiful results",
          },
        },
        {
          id: "lessthan",
          text: "Less than a year ago",
          response: {
            title: "You're a star!",
            body: "This is better than 89% of users! Getting back in shape will be a breeze with your personalized plan",
          },
        },
        {
          id: "1-3years",
          text: "1-3 years ago",
          response: {
            title: "This is better than 70% of users!",
            body: "You've been in a great shape before and we will help you get there again",
          },
        },
        {
          id: "3+years",
          text: "3+ years ago",
          response: {
            title: "56% of our users have been in your shoes",
            body: "But no matter how much time has passed, you can still get back to your best shape",
          },
        },
        {
          id: "Never",
          text: "Never",
          response: {
            title: "20% of our users share a similar journey as yours",
            body: "We've helped over 1,000,000 men already, so let us navigate you toward your goal now",
          },
        },
      ],
      female: [
        {
          id: "Rightnow",
          text: "Right now!",
          response: {
            title: "Wow! This is better than 89% of users!",
            body: "Let's maintain your beautiful results",
          },
        },
        {
          id: "lessthan",
          text: "Less than a year ago",
          response: {
            title: "You're a star!",
            body: "This is better than 89% of users! Getting back in shape will be a breeze with your personalized plan",
          },
        },
        {
          id: "1-3years",
          text: "1-3 years ago",
          response: {
            title: "This is better than 70% of users!",
            body: "You've been in a great shape before and we will help you get there again",
          },
        },
        {
          id: "3+years",
          text: "3+ years ago",
          response: {
            title: "56% of our users have been in your shoes",
            body: "But no matter how much time has passed, you can still get back to your best shape",
          },
        },
        {
          id: "Never",
          text: "Never",
          response: {
            title: "20% of our users share a similar journey as yours",
            body: "We've helped over 1,000,000 men already, so let us navigate you toward your goal now",
          },
        },
      ],
    },
    imageByGender: {
      male: quizModelImg2Male,
      female: quizModelImg2Female,
    },
    className: {
      wrapper: "flex-row-reverse",
      btn: "h-[170px] pl-[50px]",
      btnContainer: "gap-8 mt-15",
    },
  },
  // 7
  {
    id: "weight_change",
    question: "How does your weight typically change?",
    choices: [
      { id: "lose_slowly", text: "I gain weight fast but lose it slowly" },
      { id: "gain_and_lose", text: "I gain and lose weight easily" },
      { id: "struggle_to_gain", text: "I struggle to gain weight or muscle" },
    ],
    layout: "list1",
    className: {
      btnContainer: "gap-8 mt-0",
      btn: "h-[235px] pl-[50px]",
    },
  },
  // 8
  {
    id: "problem_areas",
    question: "Are any of these activities part of you life?",
    option: "multiple",
    choicesByGender: {
      male: [
        { id: "Walking_outside", text: "Walking outside", img: icon1 },
        { id: "Morning_exercise", text: "Morning exercise", img: icon2 },
        { id: "Walking_my_pet", text: "Walking my pet", img: icon3 },
        {
          id: "Spend_time",
          text: "Spend time with my child",
          img: icon4,
        },
        {
          id: "Household_affairs",
          text: "Household affairs",
          img: icon5,
        },
        { id: "None", text: "None of the above", img: icon6 },
      ],
      female: [
        { id: "Walking_outside", text: "Walking outside", img: icon1 },
        { id: "Morning_exercise", text: "Morning exercise", img: icon2 },
        { id: "Walking_my_pet", text: "Walking my pet", img: icon3 },
        {
          id: "Spend_time",
          text: "Spend time with my child",
          img: icon4,
        },
        {
          id: "Household_affairs",
          text: "Household affairs",
          img: icon5,
        },
        { id: "None", text: "None of the above", img: icon6 },
      ],
    },
    layout: "list2",
    className: {
      layoutContainer: "overflow-y-auto scroll-smooth",
      wrapper: "flex-row-reverse",
      btn: "h-[220px] pr-[10px] pl-[65px]",
      btnContainer: "gap-8",
    },
  },
  // 9
  {
    id: "struggle_to_follow",
    question: "Do you struggle with any of the following?",
    option: "multiple",
    choicesByGender: {
      male: [
        { id: "Shoulders", text: "Shoulders", img: shoulderMale },
        { id: "Back", text: "Back", img: backMale },
        { id: "Elbows", text: "Elbows", img: elbowMale },
        {
          id: "Knee",
          text: "Knee",
          img: kneeMale,
        },
        {
          id: "Ankle",
          text: "Ankle",
          img: ankleMale,
        },
        { id: "None", text: "None of the above", img: noneAboveMale },
      ],
      female: [
        { id: "Shoulders", text: "Shoulders", img: shoulderFemale },
        { id: "Back", text: "Back", img: backFemale },
        { id: "Elbows", text: "Elbows", img: elbowFemale },
        {
          id: "Knee",
          text: "Knee",
          img: kneeFemale,
        },
        {
          id: "Ankle",
          text: "Ankle",
          img: ankleFemale,
        },
        { id: "None", text: "None of the above", img: noneAboveFemale },
      ],
    },
    layout: "list2",
    className: {
      layoutContainer: "overflow-y-auto scroll-smooth",
      wrapper: "flex-row-reverse",
      btn: "h-[265px] pr-[10px] pl-[50px]",
      btnContainer: "gap-8",
      textContainer: "",
    },
  },
  // 10
  {
    id: "preferred_level",
    question: "Choose your preferred level of exercises",
    choices: [
      { id: "Keep_it_light", text: "Keep it light and chill", img: icon7 },
      { id: "some_effort", text: "I'm good with some effort", img: icon8 },
      { id: "intensity", text: "Bring on the intensity", img: icon9 },
      { id: "FitMe_decide", text: "Let FitMe decide" },
    ],

    layout: "list1",
    className: {
      btnContainer: "gap-8",
      textContainer: "justify-start",
      btn: "h-[250px] pl-[50px]",
    },
  },
  // 11
  {
    id: "How_often",
    question: "How often have you trained in the last 3 months?",
    choicesByGender: {
      male: [
        {
          id: "Not_at_all",
          text: "Not at all",
          response: {
            title: "37% of our users",
            body: "responded in the same way. FitMe will help you to create a habit to work out",
          },
        },
        {
          id: "1-2_times",
          text: "1-2 times per week",
          response: {
            title: "You've worked out more than 37% of our users!",
            body: "it will be easier for you to maintain a workout plan and feel its benefits faster",
          },
        },
        {
          id: "3-4_times",
          text: "3-4 times per week",
          response: {
            title: "You've worked out more than 62% of our users!",
            body: "It will be easier for you to maintain a workout plan and feel its benefits faster",
          },
        },
        {
          id: "Almost_everyday",
          text: "Almost everyday",
          response: {
            title: "Wow! You've worked out more than 82% of our users!",
            body: "It will be easier for you to maintain a workout plan and feel its benefits faster",
          },
        },
      ],
      female: [
        {
          id: "Not_at_all",
          text: "Not at all",
          response: {
            title: "37% of our users",
            body: "responded in the same way. FitMe will help you to create a habit to work out",
          },
        },
        {
          id: "1-2_times",
          text: "1-2 times per week",
          response: {
            title: "You've worked out more than 37% of our users!",
            body: "it will be easier for you to maintain a workout plan and feel its benefits faster",
          },
        },
        {
          id: "3-4_times",
          text: "3-4 times per week",
          response: {
            title: "You've worked out more than 62% of our users!",
            body: "It will be easier for you to maintain a workout plan and feel its benefits faster",
          },
        },
        {
          id: "Almost_everyday",
          text: "Almost everyday",
          response: {
            title: "Wow! You've worked out more than 82% of our users!",
            body: "It will be easier for you to maintain a workout plan and feel its benefits faster",
          },
        },
      ],
    },
    imageByGender: {
      male: quizModelImg3Male,
      female: quizModelImg3Female,
    },
    className: {
      wrapper: "flex-row-reverse",
      btn: "h-[170px] pl-[50px] w-[110%]",
      btnContainer: "gap-8 mx-8",
    },
  },
  // 12
  {
    id: "How_long",
    question: "How long are you ready to spend on workouts?",
    choices: [
      { id: "5-10_minutes ", text: "5-10 minutes a day" },
      { id: "10-20_minutes", text: "10-20 minutes a day" },
      { id: "20_minutes", text: "More than 20 minutes a day" },
      { id: "FitMe_decide", text: "Let Fitme decide" },
    ],

    layout: "list1",
    className: {
      btnContainer: "gap-8",
      textContainer: "justify-start",
      btn: "h-[250px] pl-[50px]",
    },
  },
  // 13
  {
    id: "best_time ",
    question: "When is the best time for you to start a workout?",
    choices: [
      { id: "specific preference ", text: "No specific preference" },
      { id: "morning", text: "In the morning" },
      { id: "afternoon", text: "In the afternoon" },
      { id: " evening", text: "In the evening" },
    ],
    option: "multiple",
    layout: "list2",
    className: {
      layoutContainer: "overflow-y-auto scroll-smooth",
      wrapper: "flex-row-reverse",
      btn: "h-[250px] pr-[10px] pl-[50px]",
      btnContainer: "gap-8",
      textContainer: "",
    },
  },
];
