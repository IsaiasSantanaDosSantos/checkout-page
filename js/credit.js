//URL test
const urlTest =
  'https://euestudo.com.br?categoryId=1767128&txt_tema=Educação&txt_search=grad&courseId=297307';

//Global variable
// let initUrl = 'https://euestudo.com.vc'; //No Grape devo Comentar essa variável
let initUrl = 'https://uniflor.edu.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://reboucasdigital.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://eadmovel.com.br'; //No Grape devo Comentar essa variável //

const searchGet = '/api/getJson.aspx?type=product_details&idProduto=';
const courseInfoUrl = '/api/getJson.aspx?type=product_details&idProduto=';
let paramsUrlList;

//Get course information
function getCourseInfo(json) {
  try {
    console.log(json);
    //Html elements
    let navLogoBox = document.querySelector('.logoBox img');

    //Get API information
    navLogoBox.setAttribute('src', json[0].urlLogotipoLoja);
  } catch (err) {
    console.warn(err);
  }
}
function fethCourseInfo() {
  try {
    getUrlParams();
    fetch(`${initUrl}${courseInfoUrl}${urlCourseId}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getCourseInfo(json);
      });
  } catch (err) {
    console.warn(err);
  }
}

function getUrlParams() {
  //urlTest
  let urlObj = new URL(urlTest);
  let urlParams = urlObj.search.substring(1).split('&');

  //CORRETO PARA PRODUÇÂO
  // let urlParams = window.location.search.substring(1).split('&');
  let urlParamArray = {};
  for (let i = 0; i < urlParams.length; i++) {
    let param = urlParams[i].split('=');
    urlParamArray[param[0]] = param[1];
    urlCategoryId = urlParamArray['categoryId'];
    urlThemeName = urlParamArray['txt_tema'];
    urlTxtSearch = urlParamArray['txt_search'];
    urlCourseId = urlParamArray['courseId'];
  }
  paramsUrlList = urlParamArray;
  return paramsUrlList;
}
fethCourseInfo();
