import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';



class StickyHeader {
    constructor() {

      this.lazyImages = $(".lazyload");  
      this.siteHeader = $(".site-header");
      this.headerTriggerElement = $(".large-hero__title");
      this.pageSection = $(".page-section");
      this.headerLinks = $(".primary-nav a");
      this.createHeaderWaypoint();
      this.createPageSectionWaypoint();
      this.addSmoothScrolling();

      /* video 53 */
      this.refreshWaypoint();
        
    }

    refreshWaypoint() {
      this.lazyImages.on('load', function() {
        Waypoint.refreshAll();
      });
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll({
            speed: 800
        });
    }

    createHeaderWaypoint() {
        let header = this.siteHeader;
        new Waypoint({
           element: this.headerTriggerElement[0],
           handler: function (direction) {
               if(direction == "down") {
                   header.addClass("site-header--dark");
               } else {
                   header.removeClass("site-header--dark");
               }
           }
        });
    }

    createPageSectionWaypoint() {
        let headerLinks = this.headerLinks;

        this.pageSection.each(function () {
              let currentPageSection = this;
              new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                  if(direction == "down") {
                      let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                      headerLinks.removeClass("is-current-link");
                      $(matchingHeaderLink).addClass("is-current-link");
                    }
                  },
                  offset: "18%"
              });
            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if(direction == "up") {
                        let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "-40%"
            });
        });
    }
}

export default StickyHeader;