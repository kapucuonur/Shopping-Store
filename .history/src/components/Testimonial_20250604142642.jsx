import { useState } from "react";

const Testimonial = () => {
  const testimonials = [
    {
      avatar: "https://picsum.photos/id/1027/200/200",  // ✅ Works reliably
      name: "Martin escobar",
      title: "Founder of meta",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae, gravida justo.",
    },
    {
      avatar: "https://picsum.photos/id/1035/200/200", 
      name: "Angela stian",
      title: "Product designer",
      quote:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      avatar: "https://picsum.photos/id/1012/200/200", 
      name: "Karim ahmed",
      title: "DevOp engineer",
      quote:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-indigo-600 font-semibold pb-6">
            What people are saying
          </h3>
          <ul>
            {testimonials.map((item, idx) => (
              <li key={idx}>
                {currentTestimonial === idx && (
                  <figure>
                    <blockquote>
                      <p className="text-gray-800 text-xl font-semibold sm:text-2xl">
                        “{item.quote}“
                      </p>
                    </blockquote>
                    <div className="mt-6">
                      <img
                        src={item.avatar}
                        alt={`${item.name}'s testimonial`}
                        className="w-16 h-16 mx-auto rounded-full"
                      />
                      <div className="mt-3">
                        <span className="block text-gray-800 font-semibold">
                          {item.name}
                        </span>
                        <span className="block text-gray-600 text-sm mt-0.5">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </figure>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <ul className="flex gap-x-3 justify-center">
            {testimonials.map((_, idx) => (
              <li key={idx}>
                <button
                  className={`w-2.5 h-2.5 rounded-full duration-150 ring-offset-2 ring-indigo-600 focus:ring ${
                    currentTestimonial === idx ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(idx)}
                ></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;