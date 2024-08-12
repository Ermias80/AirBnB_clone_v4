$(document).ready(() => {
  const reviewedA = {};

  $('input[type="checkbox"]').change(function () {
    const AId = $(this).data('id');
    const AName = $(this).data('name');

    if ($(this).is(':checked')) {
      reviewedA[AId] = AName;
    } else {
      delete reviewedA[AId];
    }
    $('.amenities h4').text(Object.values(reviewedA).join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success') {
      $('#api_status').toggleClass('available', data.status === 'OK');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    dataType: 'json',
    success: (data) => {
      $('section.places').empty();
      data.forEach((place) => {
        $('section.places').append(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`
        );
      });
    }
  });

  $('button').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(reviewedA) }),
      dataType: 'json',
      success: (data) => {
        $('section.places').empty();
        data.forEach((place) => {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guests</div>
                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        });
      }
    });
  });

  $('#toggle_reviews').click(function () {
    if ($(this).text() === 'show') {
      $.get('http://0.0.0.0:5001/api/v1/reviews/', (data) => {
        $('#reviews').empty();
        data.forEach((review) => {
          $('#reviews').append(
            `<div class="review">
              <h3>${review.title}</h3>
              <p>${review.text}</p>
            </div>`
          );
        });
        $('#reviews').show();
        $(this).text('hide');
      });
    } else {
      $('#reviews').hide();
      $(this).text('show');
    }
  });
});
