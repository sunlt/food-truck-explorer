const Router = require('@koa/router'); 
const { queryCsv }  = require('../shared');

const router = new Router({
    prefix: '/api',
});

router.get('/info', async (ctx) => {
    const { id } = ctx.query;
    const rows = await queryCsv((row) => row.locationid == id.trim() );
    if(rows.length < 1){
        ctx.status = 404;
        ctx.body = {
            msg : 'not found',
            data: null,
        };
        return;
    } 
    ctx.body = {
        data: rows[0],
    };
});

router.get('/search', async (ctx) => {
    const { keyword, lat, long, page = 1, pageSize = 20,  } = ctx.query;
    let rows = [];
    if(!keyword){
        rows = await queryCsv();
    }else{
        rows = await queryCsv((row) => row.Applicant.indexOf(keyword) !== -1);
    }

    if(lat && long){
        rows = distanceSort({lat,long}, rows);
    }

    ctx.body = {
        total: rows.length,
        list: rows.slice((page-1) * pageSize, page * pageSize),
    };
});



const distanceSort = (
    { lat, long },
    arr,
    asc = true,
  ) => {
    const sortedArray = arr.sort((a, b) => {
        const distanceA = getDistance(lat, long, a.Latitude, a.Longitude);
        const distanceB = getDistance(lat, long, b.Latitude, b.Longitude);
        return asc ? distanceA - distanceB : distanceB - distanceA;
    });
    return sortedArray
  };

// Distance calculation
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  
  // Deg conversion
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
   
module.exports = router;