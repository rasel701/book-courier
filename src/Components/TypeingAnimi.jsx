import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeingAnimi = () => {
  return (
    <div>
      <div className="text-center py-20 bg-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          <Typewriter
            words={[
              "Reading Changes Everything.",
              "We Deliver Books Faster.",
              "Discover Your Next Favorite Book.",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1500}
          />
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Join thousands of readers exploring books every day.
        </p>
      </div>
    </div>
  );
};

export default TypeingAnimi;
<div className="text-center py-20 bg-gray-100">
  <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
    <Typewriter
      words={[
        "Reading Changes Everything.",
        "We Deliver Books Faster.",
        "Discover Your Next Favorite Book.",
      ]}
      loop={0}
      cursor
      cursorStyle="|"
      typeSpeed={80}
      deleteSpeed={60}
      delaySpeed={1500}
    />
  </h1>

  <p className="mt-4 text-lg text-gray-600">
    Join thousands of readers exploring books every day.
  </p>
</div>;
