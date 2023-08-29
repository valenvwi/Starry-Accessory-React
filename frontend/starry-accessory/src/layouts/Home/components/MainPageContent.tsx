export const MainPageContent = () => {
  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>

          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Our story</h1>
              <p className="lead">
                Our owner is a hospitality professional working with a great
                sence of art.
              </p>
              <a className="btn main-color btn-lg text-white" href="#">
                Check out more
              </a>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Our collection</h1>
              <p className="lead">New Autumn collection is out!</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>Our story</h1>
              <p className="lead">
                Our owner is a hospitality professional working with a great
                sense of art.
              </p>
              <a className="btn main-color btn-lg text-white" href="#">
                Check out more
              </a>
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Our collection</h1>
              <p className="lead">New Autumn collection is out!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
