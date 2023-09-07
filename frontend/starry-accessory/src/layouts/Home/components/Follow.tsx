export const Follow = () => {
  return (
    <div className="container my-5">
      <div className="row p-4 align-items-center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h1 className="display-4 fw-bold">Wanna know the new products</h1>
          <p className="lead">
            Follow us on Instagram and you will get the latest products details!
          </p>
          <div className="d-grid gap-2 justify-content-md-end mb-4 mb-lg-3">
            <a
              className="btn main-color btn-lg text-white"
              href="https://www.instagram.com/starry_accessory_macau/"
              target="_blank" rel="noreferrer"
            >
              Follow
            </a>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 shadow-lg contact-image"></div>
      </div>
    </div>
  );
};
