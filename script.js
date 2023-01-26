const sortId = document.getElementById('sort');

const categoryUrl = 'https://openapi.programming-hero.com/api/news/categories';

const getNewsCategory = async () => {
	try {
		const res = await fetch(categoryUrl);
		const data = await res.json();
		setCategory(data.data.news_category);
	} catch (error) {
		console.log(error);
	}
};

function setCategory(categories) {
	const categoryUl = document.getElementById('category_ul');
	categories.map((category) => {
		const categoryLi = document.createElement('li');
		categoryLi.classList.add('col');
		categoryLi.innerText = `
			${category.category_name}

        `;

		categoryUl.appendChild(categoryLi);

		categoryLi.addEventListener('click', function () {
			sortId.value = 'default';
			toggleSpinner(true);
			getCategoriesItems(category.category_id);
		});
	});
}
getCategoriesItems('08');

// | CATEGORY ITEMS BY ID

async function getCategoriesItems(category_id) {
	try {
		const newsUrl = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
		const res = await fetch(newsUrl);
		const data = await res.json();
		setCategoryNews(data.data);
		toggleSpinner(false);
	} catch (error) {
		console.log(error.message);
	}
}

function setCategoryNews(category_news) {
	const newsSectionDiv = document.getElementById('news');
	newsSectionDiv.innerHTML = '';

	const newsQuantityDiv = document.getElementById('news-quantity');
	newsQuantityDiv.innerHTML = `
	                            <p>${category_news.length} news found </p>
	                    `;
	if (category_news.length > 20) {
		newsQuantityDiv.innerHTML = `
	                            <p>${category_news.length} news found  </p>
	                    `;
	} else if (category_news.length > 0 && category_news.length < 20) {
		newsQuantityDiv.innerHTML = `
        <p>${category_news.length} items found for this category  </p>
`;
	} else {
		newsQuantityDiv.innerHTML = `
	                        <p>${category_news.length} items found for this category  </p>
	                `;
		newsSectionDiv.innerText = `No Data found `;
	}

	// | CATEGORY  ITEMS
	category_news.map((news) => {
		const newsDiv = document.createElement('div');
		// console.log(news);

		newsDiv.innerHTML = `
                    <div
                    class="bg-white p-3 d-flex mb-2 flex-column flex-md-row"
                    style="border-radius: 5px"
                >
                    <!-- | news left side -->
                    <div class="mb-5 mx-sm-1">
                        <img
                            src=${news.thumbnail_url}
                            alt=""
                            style="border-radius: 5px"
                            class=""
                        />
                    </div>
                    
                    <div class="px-4 ">
                        <h5 class="fw-bold">
                            ${news.title}
                        </h5>

                        <p class="my-3">
                            ${
															news.details.length > 200
																? news.details.slice(0, 300) + '...'
																: news.details
														}
                        </p>

                        <div class="text-center">
                            <div
                                class="d-flex flex-column justify-content-between flex-md-row"
                            >
                                <img
                                    src=${
																			news.author.img
																				? news.author.img
																				: 'no img found'
																		}
                                    alt=""
                                    style="width: 50px; height: 50px; border-radius: 50%"
                                    class="mx-auto mx-md-1"
                                />
                
                                <div class="mx-2 mb-2">
                                    <span class="fw-bold">
                                    ${
																			news.author.name
																				? news.author.name
																				: 'name not included'
																		}
                                    </span><br />
                                    <span>${
																			news.author.published_date
																				? news.author.published_date
																				: 'no date exist'
																		}</span>
                                </div>
                                <div class="mb-2">
                                    <i class="fas fa-eye"></i> <span class="fw-bold">${
																			news.total_view
																				? news.total_view
																				: 'no views'
																		}</span>
                                </div>
                
                                <div class="mb-4">
                                    <i class="fas fa-star-half-alt"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                </div>
                
                                <button id="detail" onclick="setDetailId('${
																	news._id
																}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Show detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            `;

		newsSectionDiv.appendChild(newsDiv);
	});
	// | END

	//  | SORTED FUNCTION
	const sortedFunc = () => {
		if (sortId.value == 'top') {
			newsSectionDiv.innerHTML = '';

			category_news
				.sort((a, b) => b.total_view - a.total_view)
				.map((news) => {
					const newsDiv = document.createElement('div');
					// console.log(news);

					newsDiv.innerHTML = `
                        <div
                        class="bg-white p-3 d-flex mb-2 flex-column flex-md-row"
                        style="border-radius: 5px"
                    >
                        <!-- | news left side -->
                        <div class="mb-5 mx-sm-1">
                            <img
                                src=${news.thumbnail_url}
                                alt=""
                                style="border-radius: 5px"
                                class=""
                            />
                        </div>
                        
                        <div class="px-4">
                            <h5 class="fw-bold">
                                ${news.title}
                            </h5>
    
                            <p>
                                ${
																	news.details.length > 200
																		? news.details.slice(0, 300) + '...'
																		: news.details
																}
                            </p>
    
                            <div class="text-center">
                                <div
                                    class="d-flex flex-column justify-content-between flex-md-row"
                                >
                                    <img
                                        src=${
																					news.author.img
																						? news.author.img
																						: 'no img found'
																				}
                                        alt=""
                                        style="width: 50px; height: 50px; border-radius: 50%"
                                        class="mx-auto mx-md-1"
                                    />
                    
                                    <div class="mx-2 mb-2">
                                        <span class="fw-bold">
                                        ${
																					news.author.name
																						? news.author.name
																						: 'name not included'
																				}
                                        </span><br />
                                        <span>${
																					news.author.published_date
																						? news.author.published_date
																						: 'no date exist'
																				}</span>
                                    </div>
                                    <div class="mb-2">
                                        <i class="fas fa-eye"></i> <span class="fw-bold">${
																					news.total_view
																				}</span>
                                    </div>
                    
                                    <div class="mb-4">
                                        <i class="fas fa-star-half-alt"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                    
                                    <button id="detail" onclick="setDetailId(${
																			news.id
																		})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Show detail</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                `;

					newsSectionDiv.appendChild(newsDiv);
				});
		}
	};
	sortId.addEventListener('change', sortedFunc);
	// | SORTED FUNCTION END
}

const setDetailId = async (news_id) => {
	const newsDetailUrl = `https://openapi.programming-hero.com/api/news/${news_id}`;

	try {
		const res = await fetch(newsDetailUrl);
		const data = await res.json();
		getNewsDetails(data.data[0]);
	} catch (error) {
		console.log(error);
	}
};

// | news details modal function

const getNewsDetails = (data) => {
	const lodder = document.getElementById('exampleModal');
	console.log(data);

	lodder.innerHTML = `
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${
					data.title ? data.title : 'no title'
				}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="moda-body" class="modal-body">
				<div> <img src=${
					data.image_url ? data.image_url : 'no image found'
				} class="w-100" alt=""></div>
            ${data.details ? data.details.slice(0, 400) : 'no detail availble'}
                        
            <p class="fw-bold">  views:${
							data.total_view ? data.total_view : 'views not exist'
						} </p>
            <span class="fw-bold">rating: ${data.rating.number}</span>
            


        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
    
    `;
};

// | spinner functionality
const toggleSpinner = (isLodding) => {
	const lodder = document.getElementById('lodder');
	if (isLodding) {
		lodder.classList.remove('d-none');
	} else {
		lodder.classList.add('d-none');
	}
};

getNewsCategory();
