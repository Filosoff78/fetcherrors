const render = {
  templateError: `<div class="alert alert-warning w-50 mx-auto" role="alert">
      <h1 class="text-center">Список товаров пуст</h1>
    </div>`,

  templateCard: (img, name, price) => `<div class="col">
      <div class="card h-100">
        <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Цена: ${price}$</p>
          </div>
      </div>
    </div>`,

  render(elements) {
    let whatNeedRender;
    if (elements.products && elements.products.length > 0) {
      whatNeedRender = '<div class="container pt-3"><div class="row row-cols-1 row-cols-md-3 g-4">';
      elements.products.forEach((element) => {
        whatNeedRender += this.templateCard(
          element.image,
          element.name,
          element.price,
        );
      });
      whatNeedRender += '</div></div>';
    } else {
      whatNeedRender = render.templateError;
    }
    document.body.insertAdjacentHTML('beforeend', whatNeedRender);
  },
};

export default render;
