import React from "react";

const Home = () => {
  const galleryImages = [
    { src: "1.jpg", category: "animals" },
    { src: "2.jpg", category: "nature" },
    { src: "3.jpg", category: "love" },
    { src: "5.jpg", category: "photo" },
    { src: "6.jpg", category: "nature" },
    { src: "4.jpg", category: "photo" },
  ];

  return (
    <div className="main-warp">
      {/* Page Section */}
      <div className="page-section gallery-page">
        {/* Portfolio Filters */}
        <ul className="portfolio-filter">
          <li className="filter all active" data-filter="*">All</li>
          <li className="filter" data-filter=".photo">Photography</li>
          <li className="filter" data-filter=".nature">Nature</li>
          <li className="filter" data-filter=".love">Love</li>
          <li className="filter" data-filter=".animals">Animals</li>
        </ul>

        {/* Portfolio Gallery */}
        <div className="portfolio-gallery">
          {galleryImages.map((image, index) => (
            <div key={index} className={`gallery-item ${image.category}`}>
              <img
                src={`/assets/img/gallery/${image.src}`}
                alt={`Gallery ${index + 1}`}
              />
              <div className="hover-links">
                <a href="#" className="site-btn sb-light">
                  Next
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
