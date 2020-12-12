module.exports = {
    purge: [],
    theme: {
      screens:{
          xs:'340px',
          sm:'576px',
          bsm:'610px',
          md:'769px',
          bmd:'810px',
          lg:'1025px',
          xl:'1280px'
      },
      extend: {
          colors:{
              lightBlack:"#333",
            //   offwhite:"#FBFBFB",
            //   baseGreen:'#335C67'
          },
          height:{
              '1/4':'25%',
              '2/4':'50%',
              '3/4':'75%',
              '1/5':'20%',
              '2/5':'40%',
              '3/5':'60%',
              '4/5':'80%',
              '1/6':'16.67%',
              '2/6':'33.33%',
              '3/6':'50%',
              '4/6':'66.67%',
              '5/6':'83.33%'
          },
          margin:{
              'offset-1':'8.33%',
              'offset-2':'16.66%'
          }
      },
    },
    variants: {},
    plugins: [],
  }