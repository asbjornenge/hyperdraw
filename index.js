var blessed = require('blessed')
var hyperswarm = require('hyperswarm')

module.exports = function(opts) {
    var hswarm  = hyperswarm('hyperdraw', opts)
    var mycolor = opts.color || require('randomcolor')({
        luminosity : 'random',
        hue : 'random'
    })

    var screen  = blessed.screen({
        autoPadding : true,
        smartCSR    : true
    })
    var box = blessed.box({
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })

    /* FROM HERE */

    box.on('click', function(e) {
        var data = {}
        data[e.x + '-' + e.y] = mycolor
        hswarm.setState(data)
    })
    hswarm.on('change', function(change) {
        Object.keys(change).forEach(function(coordinates) {
            var c = coordinates.split('-')
            var x = c[0]
            var y = c[1]
            box.append(blessed.box({
                top : parseInt(y),
                left : parseInt(x),
                width : 1,
                height : 1,
                style : {
                    bg : change[coordinates] 
                }
            }))
        })
        screen.render()
    })

    /* TO HERE */

    screen.append(box)
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      hswarm.close()
      setTimeout(function() { process.exit(0) }, 100) 
      return
    });
    box.focus();
    screen.render();
}
