function initHotelsMap() {
  // Наверное можно одновременно, сейчас это работает так:
  // Промис -> Промис -> Выполнение кода
  // 1. Берем данные из json
  // 2. Ждем загрузку ymaps

  const container = document.querySelector('#hotelsMap');
  if (!container) return;

  fetch('assets/data/map.json')
  .then(res => {
    return res.json();
  })
  .then(res => {
    ymaps.ready(() => {
      init(res);
    });
  });

  function init(data) {
    const map = new ymaps.Map(container, {
      center: data.meta.center,
      zoom: data.meta.zoom,
      controls: ['zoomControl']
    });

    map.behaviors.disable('scrollZoom');

    // Шаблон баллуна для отеля
    const hotelBalloonLayoutClass = ymaps.templateLayoutFactory.createClass(
      `<div class="map-balloon js-map-layout">
        <span class="map-balloon__title">{{properties.name}}</span>
        <ul class="rating map-balloon__rating" data-rating="{{properties.stars}}">
          <li class="rating__unit">
            <svg class="rating__star">
              <use xlink:href="#star">
            </svg>
          </li>
          <li class="rating__unit">
            <svg class="rating__star">
              <use xlink:href="#star">
            </svg>
          </li>
          <li class="rating__unit">
            <svg class="rating__star">
              <use xlink:href="#star">
            </svg>
          </li>
          <li class="rating__unit">
            <svg class="rating__star">
              <use xlink:href="#star">
            </svg>
          </li>
          <li class="rating__unit">
            <svg class="rating__star">
              <use xlink:href="#star">
            </svg>
          </li>
        </ul>
        <span class="map-balloon__cost">Стоимость номеров от {{properties.cost}} ₽</span>
        {% if properties.timetable %}
          <ul class="map-balloon__timetable-list">
          {% for item in properties.timetable %}
            <li class="map-balloon__timetable-list-item">{{ item }}</li>
          {% endfor %}
          </ul>
        {% endif %}
      </div>`
    );

    // Баллун для холла
    const hallBalloonLayoutClass = ymaps.templateLayoutFactory.createClass(
      `<div class="map-hall-balloon js-map-layout">
        {% autoescape on %}
        <span class="map-hall-balloon__title">{{properties.name}}</span>
        <div class="map-hall-balloon__timetable-container">
        {% for item in properties.timetable %}
          <span class="map-hall-balloon__timetable-date">{{item.date}}</span>
          <div class="map-hall-balloon__timetable">
          {% for item in item.activity %}
            <div class="map-hall-balloon__timetable-time-block">
              <span class="map-hall-balloon__timetable-time">{{item.time.from}}</span>
              <span class="map-hall-balloon__timetable-time">{{item.time.to}}</span>
            </div>
            <span class="map-hall-balloon__timetable-name">{{item.name}}</span>
          {% endfor %}
          </div>
        {% endfor %}
        </div>
        {% endautoescape %}
      </div>`
    );

    data.hotels.forEach(hotel => {
      addPlacemark(map, hotelBalloonLayoutClass, [hotel.lat, hotel.lng], hotel);
    });

    addPlacemark(map, hallBalloonLayoutClass, [data.hall.lat, data.hall.lng], { name: data.hall.name, timetable: data.hall.timetable }, false);
  }

  /**
   * Добавляет объект на Яндекс Карту
   * @param {Object} balloonLayout - шаблон баллуна (ymaps.templateLayoutFactory)
   * @param {Array} coords - Координаты в виде массива [55.76, 37.56]
   * @param {Object} properties - Параметры: имя, описание и т.д.
   * @param {Boolean} openBalloon - Открыть баллун сразу
   */
  function addPlacemark(map, balloonLayout, coords, { name, stars, cost, timetable }, openBalloon) {
    const placemarkProperties = {
      name,
      stars,
      cost,
      timetable
    };

    const placemarkOptions = {
      balloonContentLayout: balloonLayout,
      balloonMaxHeight: 1000,
      balloonMaxWidth: 400,
      balloonPanelMaxMapArea: 400000,
      iconLayout: 'default#image',
      iconImageHref: timetable ? 'img/icons/pin-icon.svg' : 'img/icons/pin-icon-red.svg',
      iconImageSize: [50, 50],
      iconImageOffset: [-25, -45],
      hideIconOnBalloonOpen: false
    };

    const placemark = new ymaps.Placemark(coords, placemarkProperties, placemarkOptions);

    // При открытии баллуна выставляем рейтинг
    placemark.events.add('balloonopen', (e) => {
      const placemarkContainer = container.querySelector('.ymaps-2-1-79-balloon');
      const layoutContainer = placemarkContainer.querySelector('.js-map-layout');

      const scrollContainer = layoutContainer.parentElement.parentElement;
      scrollContainer.classList.add('scroll-balloon');
      
      placemarkContainer.classList.add('active');

      if (timetable && timetable[0].activity) {
        placemarkContainer.classList.add('hall');
      }

      const ratingElements = layoutContainer.querySelectorAll('.rating');
    
      ratingElements.forEach(element => {
        const stars = element.dataset.rating;

        const starsElement = Array.from(element.querySelectorAll('.rating__star'));

        for (let i=0; i<stars; i++) {
          starsElement[i].style.opacity = "1";
        }
      })
    })
    
    if (openBalloon) {
      setTimeout(() => {
        placemark.balloon.open();
      }, 20)
    }

    map.geoObjects.add(placemark);
  }
}

class MapComponent {
  constructor(data) {
    const hostElem = document.querySelector('.page-content');
    if (!hostElem) return;

    this.initMap = this.initMap.bind(this);
    this.mapElem = hostElem.querySelector('.js-contacts-map');
    this.hallData = data.hall;
    this.hotels = data.hotels;

    console.log('А');

    ymaps.ready(this.initMap);
  }

  initMap() {
    const dataLat = Number(this.mapElem.getAttribute('data-lat'));
    const dataLng = Number(this.mapElem.getAttribute('data-lng'));
    const dataZoom = Number(this.mapElem.getAttribute('data-zoom'));

    let pinOptions = {
      iconLayout: 'default#image',
      iconImageHref: dataPinURL,
      iconImageSize: window.innerWidth >= 768 ? [66, 84] : [56, 64],
      iconImageOffset: [-33, -85]
    };

    const center = [dataLat, dataLng];

    const geoPing = window.innerWidth >= 768 ? [dataLat - 0.0001, dataLng + 0.0004] : center;
    const geoPingBalloon = window.innerWidth >= 768 ? [dataLat + 0.00067, dataLng - 0.0025] : center;

    const mapInstance = new ymaps.Map(this.mapElem, {
      center: geoPing,
      zoom: dataZoom,
      controls: []
    });

    mapInstance.behaviors.disable('scrollZoom');

    mapInstance.controls.add('zoomControl', {
      position: {
        right: 10,
        top: 150
      },
      size: 'small'
    });

    const balloonMaps = [
      {
        coords: geoPingBalloon,
        title: dataAddress
      }
    ];

    const pointsMapData = [
      {
        coords: geoPingBalloon
      }
    ];

    ///

    const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover top">' +
        '<div class="arrow"></div>' +
        '<div class="popover-inner">' +
        '$[[options.contentLayout observeSize minWidth=150 maxWidth=300 maxHeight=450]]' +
        '</div>' +
        '</div>',
      {
        build: function() {
          this.constructor.superclass.build.call(this);
          this._$element = $('.popover', this.getParentElement());
          this.applyElementOffset();
          this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
        },

        clear: function() {
          this._$element.find('.close').off('click');
          this.constructor.superclass.clear.call(this);
        },

        onSublayoutSizeChange: function() {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();
          this.events.fire('shapechange');
        },
        applyElementOffset: function() {
          this._$element.css({
            right: -this._$element[0].offsetWidth,
            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
          });
        },

        onCloseClick: function(e) {
          e.preventDefault();
          this.events.fire('userclose');
        },

        getShape: function() {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          const position = this._$element.position();
          return new ymaps.shape.Rectangle(
            new ymaps.geometry.pixel.Rectangle([
              [position.left, position.top],
              [
                position.left + this._$element[0].offsetWidth,
                position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
              ]
            ])
          );
        },

        _isElement: function(element) {
          return element && element[0] && element.find('.arrow')[0];
        }
      }
    );
    // Создание вложенного макета содержимого балуна.
    let htmlBalloon = '<div class="popover-wrapper">';
    balloonMaps.forEach(map => {
      htmlBalloon += '<div class="popover-item">' + `<div class="popover-title">${map.title}</div>`;
    });
    htmlBalloon += '</div></div>';

    const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(htmlBalloon);

    const objectManager = new ymaps.ObjectManager({
      clusterize: false,
      clusterHasBalloon: false,
      geoObjectOpenBalloonOnClick: true
    });
    mapInstance.geoObjects.add(objectManager);

    pointsMapData.forEach(function(item) {
      const objectToAdd = {
        id: item.coords.join('-'),
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: item.coords
        },
        options: {
          ...pinOptions,
          balloonShadow: false,
          balloonLayout: MyBalloonLayout,
          balloonContentLayout: MyBalloonContentLayout,
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
          balloonOffset: [0, 0]
        },
        properties: {
          balloonContent: item.content,
          balloonHeader: item.title
        }
      };
      objectManager.add(objectToAdd);
      objectManager.objects.balloon.open(item.coords.join('-'));
    });

    ///
  }
}

export { initHotelsMap };
