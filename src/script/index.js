$(document).ready(() => {
  //redirect if is not https
  !window.location.href.includes("127.0.0.1") &&
    !window.location.href.includes("https") &&
    (window.location.href = `https://${window.location.host}`);

  //mask for user money
  $("#userMoney").maskMoney({
    prefix: "R$ ",
    allowNegative: true,
    thousands: ".",
    decimal: ",",
    affixesStay: true,
  });

  //add first card
  addCard();

  //enable add button
  $("#addButton").click((e) => {
    e.preventDefault();
    addCard();
  });

  //handle checkbox buttons
  checkBox();

  resultBox();
});

var settings = {
  delete: null,
};

function addCard() {
  //creates a new card and set as display block
  $(".drink-card")
    .parent()
    .append($($(".drink-card")[0].cloneNode(true)).toggleClass("d-none"));

  //listen the new drink to enable remove
  removeCard();

  //changes image and name of the drink
  imageAndNameDrink();

  //listen the new drink to enable personalized size
  personalizedSize();

  //mask
  $(".unity-price").maskMoney({
    prefix: "R$ ",
    allowNegative: true,
    thousands: ".",
    decimal: ",",
    affixesStay: true,
  });

  $(".drink-size input").maskMoney(
    {
      suffix: " ml",
      allowNegative: true,
      thousands: ".",
      decimal: ".",
      affixesStay: true,
      precision: 3,
      reverse: true,
    },
    0.0
  );

  //listener of values
  valuesChanges();

  //listeners for header
  headerMenu();
}

//remove and listen a drink
function removeCard() {
  //listen all cards to remove
  $(".removeButton").click(function () {
    //prevent remove all cards
    if ($(".removeButton").length > 2) {
      //set the card
      settings.delete = $(this).parent().parent();

      //show the box
      $("#confirmBox").removeClass("d-none");
    }
  });
}

function checkBox() {
  //set a listener to remove the drink
  $("#confirmBox button:first-child").click(() => {
    settings.delete.remove();
    settings.delete = null;
    headerMenuCalc();
    $("#confirmBox").toggleClass("d-none");
  });

  //set listener to remove the show box
  $("#confirmBox button:last-child").click(() =>
    $("#confirmBox").toggleClass("d-none")
  );
}

//show the field to a personalized size of a drink
function personalizedSize() {
  $(".drink-size-select select").change(function (e) {
    const drinkSizeField = $(this).parent().parent().children(".drink-size");

    e.target.value === "0"
      ? drinkSizeField.css("display", "flex")
      : drinkSizeField.css("display", "none");
  });
}

function imageAndNameDrink() {
  $(".drink-type select").change(function (e) {
    //creates the url
    let url = `/src/images/logos/${e.target.value}.png`;
    console.log(url);
    //set the url in the image
    $(this).parents(".drink-card").find("img").attr("src", url);

    //set the name of the drink
    $(this).parents(".drink-card").find(".drink-name").text(e.target.value);

    //set as an adit content
    $(this)
      .parents(".drink-card")
      .find(".drink-name")
      .attr("contenteditable", e.target.selectedIndex == 1 ? true : false);

    $(this).parents(".drink-card").find(".drink-name").focus();

    if (e.target.selectedIndex == 1) {
      $(this).parents(".drink-card").find(".drink-name").addClass("amber-text");
    } else {
      $(this)
        .parents(".drink-card")
        .find(".drink-name")
        .removeClass("amber-text");
    }
  });
}

//listeners
function valuesChanges() {
  $(
    ".drink-size-select select, .drink-quantit .quantity, .unity-price, .drink-size input"
  ).on("keyup change", function () {
    setValuesOnCard($(this).parents(".drink-card"));
  });

  $(".drink-quantit .plus, .drink-quantit .minus").click(function () {
    setValuesOnCard($(this).parents(".drink-card"));
  });
}

//setting values on card
function setValuesOnCard(card) {
  const drink = calcDrinkValues(card);

  card.find(".drink-liter span").text(`${drink.drink_size_total} L`);
  card
    .find(".drink-total-price span")
    .text(floatToMoney(drink.drink_price_total));
}

//return the money formatted
function floatToMoney(price) {
  return $("<input />")
    .maskMoney({
      prefix: "R$ ",
      allowNegative: true,
      thousands: ".",
      decimal: ",",
      affixesStay: true,
    })
    .maskMoney("mask", price)
    .val();
}

//calculus return a object
function calcDrinkValues(card) {
  drink = {
    drink_size: parseFloat(card.find(".drink-size-select select")[0].value),

    drink_quantity: parseInt(card.find(".drink-quantit .quantity")[0].value),

    drink_unity_price: $(card.find(".unity-price")[0]).maskMoney("unmasked")[0],
  };

  //ternary to personalized size
  drink.drink_size_personalized =
    drink.drink_size === 0
      ? $(card.find(".drink-size input")[0]).maskMoney("unmasked")[0]
      : drink.drink_size;

  //total price
  drink.drink_price_total = drink.drink_quantity * drink.drink_unity_price;

  //total liters
  drink.drink_size_total = (
    drink.drink_size_personalized * drink.drink_quantity
  ).toFixed(2);

  return drink;
}

function headerMenu() {
  $(
    ".drink-size-select select, .drink-quantit .quantity, .unity-price, .drink-size input, #userMoney"
  ).on("keyup change", function () {
    headerMenuCalc();
  });

  $(".drink-quantit .plus, .drink-quantit .minus").click(function () {
    headerMenuCalc();
  });
}

function headerMenuCalc() {
  //initializing variable
  let cardTotal = [];

  //setting card values on array
  $(".drink-card").each(function (i, card) {
    i > 0 ? cardTotal.push(calcDrinkValues($(card))) : null;
  });

  //total liter
  const drinkSizeTotal = cardTotal.reduce((sum, card) => {
    return sum + parseFloat(card.drink_size_total);
  }, 0.0);

  //total price
  const drinkPriceTotal = cardTotal.reduce((sum, card) => {
    return sum + parseFloat(card.drink_price_total);
  }, 0.0);

  let restMoney = $("#userMoney").maskMoney("unmasked")[0] - drinkPriceTotal;

  restMoney < 0
    ? $($(".drink-results h4 p").get(0)).text("Faltou")
    : $($(".drink-results h4 p").get(0)).text("Sobrou");

  //setting rest money
  $($(".drink-results h4 span").get(0)).text(floatToMoney(restMoney));

  //setting size drink
  $($(".drink-results h4 span").get(1)).text(`${drinkSizeTotal.toFixed(2)} L`);
}

function resultBox() {
  if ($(window).width() >= 768) {
    $(".drink-results").width($(".col-xl-4").width());
  }

  $(window).resize(function () {
    $(".drink-results").width($(".col-xl-4").width() - 48);
  });

  $(window).scroll(function () {
    if ($(window).width() >= 768) {
      if ($("html").get(0).scrollTop >= 109) {
        $($(".drink-results").get(0)).css("position", "fixed");
      } else {
        $(".drink-results").css("position", "initial");
      }
    } else {
      $(".drink-results").css("position", "initial");
    }
  });
}
