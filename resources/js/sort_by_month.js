jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "date-range-pre": function ( a ) {
        var monthArr = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
        return monthArr.indexOf(a);	
    },
     "date-range-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
     "date-range-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
} );

