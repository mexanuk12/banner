var ringer = {
    countdown_to: " 05:58 09/21/2016",
    rings: {
        'hours': {
            s: 3600000, // mseconds per hour,
            max: 24
        },
        'minutes': {
            s: 60000, // mseconds per minute
            max: 60
        },
        'seconds': {
            s: 1000,
            max: 60
        },
    },
    r_count: 3,
    r_spacing: 13, // px
    r_size: 78, // px
    r_thickness: 5, // px
    update_interval: 11, // ms


    init: function () {

        $r = ringer;
        $r.cvs = document.getElementById("b");

        $r.size = {
            w: ($r.r_size + $r.r_thickness) * $r.r_count + ($r.r_spacing * ($r.r_count - 1)),
            h: ($r.r_size + $r.r_thickness)
        };



        $r.cvs.setAttribute('width', $r.size.w);
        $r.cvs.setAttribute('height', $r.size.h);
        $r.ctx = $r.cvs.getContext('2d');
        $("#banner-big").append($r.cvs);
        $r.cvs = $($r.cvs);
        $r.ctx.textAlign = 'center';
        $r.actual_size = $r.r_size + $r.r_thickness;
        $r.countdown_to_time = new Date($r.countdown_to).getTime();
        $r.cvs.css({ width: $r.size.w + "px", height: $r.size.h + "px" });
        $r.go();
    },
    ctx: null,
    go: function () {
        var idx = 0;

        $r.time = (new Date().getTime()) - $r.countdown_to_time;


        for (var r_key in $r.rings) $r.unit(idx++, r_key, $r.rings[r_key]);

        setTimeout($r.go, $r.update_interval);
    },
    unit: function (idx, label, ring) {
        var x, y, value, ring_secs = ring.s;
        value = parseFloat($r.time / ring_secs);
        $r.time -= Math.round(parseInt(value)) * ring_secs;
        value = Math.abs(value);

        x = ($r.r_size * .5 + $r.r_thickness * .5);
        x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
        y = $r.r_size * .5;
        y += $r.r_thickness * .5;


        // calculate arc end angle
        var degrees = 360 - (value / ring.max) * 360.0;
        var endAngle = degrees * (Math.PI / 180);

        $r.ctx.save();

        $r.ctx.translate(x, y);
        $r.ctx.clearRect($r.actual_size * -0.5, $r.actual_size * -0.5, $r.actual_size, $r.actual_size);

        // first circle
        $r.ctx.strokeStyle = "#d4686a";
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 0, 2 * Math.PI, 2);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // second circle
        $r.ctx.strokeStyle = "#eeeccd";
        $r.ctx.beginPath();
        $r.ctx.arc(0, 0, $r.r_size / 2, 0, endAngle, 1);
        $r.ctx.lineWidth = $r.r_thickness;
        $r.ctx.stroke();

        // label
        $r.ctx.fillStyle = "#eeeccd";

        $r.ctx.font = '12px RobotoMedium';
        $r.ctx.fillText(label, 0, 23);
        $r.ctx.fillText(label, 0, 23);

        $r.ctx.font = '36px Cookie';
        $r.ctx.fillText(Math.floor(value), 0, 10);

        $r.ctx.restore();
    }
}

ringer.init();