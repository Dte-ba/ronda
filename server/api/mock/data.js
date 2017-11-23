'use strict';

var _ = require('lodash');
var uuidv4 = require('uuid/v4');

var LIMIT = 50;

var names = [{
  "fullname": "Kienan Joseph",
  "email": "kjoseph0@princeton.edu",
  "avatar": "https://robohash.org/etfacerequos.jpg?size=50x50&set=set1"
}, {
  "fullname": "Carola Rehor",
  "email": "crehor1@wiley.com",
  "avatar": "https://robohash.org/explicaboautreiciendis.png?size=50x50&set=set1"
}, {
  "fullname": "Ody Hartwell",
  "email": "ohartwell2@multiply.com",
  "avatar": "https://robohash.org/iurefacilisnulla.jpg?size=50x50&set=set1"
}, {
  "fullname": "Lizzie McCrystal",
  "email": "lmccrystal3@bluehost.com",
  "avatar": "https://robohash.org/sequisolutanesciunt.bmp?size=50x50&set=set1"
}, {
  "fullname": "Cara Lowdwell",
  "email": "clowdwell4@about.me",
  "avatar": "https://robohash.org/errorquiadoloribus.jpg?size=50x50&set=set1"
}, {
  "fullname": "Bettine Littleton",
  "email": "blittleton5@eepurl.com",
  "avatar": "https://robohash.org/sedquiaomnis.bmp?size=50x50&set=set1"
}, {
  "fullname": "Gretna Zanuciolii",
  "email": "gzanuciolii6@flavors.me",
  "avatar": "https://robohash.org/quiainplaceat.png?size=50x50&set=set1"
}, {
  "fullname": "Ursola Pollie",
  "email": "upollie7@gnu.org",
  "avatar": "https://robohash.org/doloremettempora.jpg?size=50x50&set=set1"
}, {
  "fullname": "Luciano Redford",
  "email": "lredford8@eventbrite.com",
  "avatar": "https://robohash.org/sedutid.bmp?size=50x50&set=set1"
}, {
  "fullname": "Jeanie Vaisey",
  "email": "jvaisey9@example.com",
  "avatar": "https://robohash.org/fugitquodquaerat.png?size=50x50&set=set1"
}, {
  "fullname": "Cynthie Vanyarkin",
  "email": "cvanyarkina@ftc.gov",
  "avatar": "https://robohash.org/culpaetdolorem.png?size=50x50&set=set1"
}, {
  "fullname": "Sasha Kendrew",
  "email": "skendrewb@va.gov",
  "avatar": "https://robohash.org/idinventoredolorem.png?size=50x50&set=set1"
}, {
  "fullname": "Pepi Horsburgh",
  "email": "phorsburghc@histats.com",
  "avatar": "https://robohash.org/quisnostrummaxime.jpg?size=50x50&set=set1"
}, {
  "fullname": "Corey Kennan",
  "email": "ckennand@techcrunch.com",
  "avatar": "https://robohash.org/architectoestest.bmp?size=50x50&set=set1"
}, {
  "fullname": "Paulita Laying",
  "email": "playinge@canalblog.com",
  "avatar": "https://robohash.org/utnonoccaecati.png?size=50x50&set=set1"
}, {
  "fullname": "Alejandro Webster",
  "email": "awebsterf@free.fr",
  "avatar": "https://robohash.org/eligendiinventoremodi.bmp?size=50x50&set=set1"
}, {
  "fullname": "Valentine McInnery",
  "email": "vmcinneryg@w3.org",
  "avatar": "https://robohash.org/velitconsecteturfugiat.png?size=50x50&set=set1"
}, {
  "fullname": "Obediah Furmage",
  "email": "ofurmageh@reverbnation.com",
  "avatar": "https://robohash.org/uttotamfugit.bmp?size=50x50&set=set1"
}, {
  "fullname": "Elsie Petrovic",
  "email": "epetrovici@miibeian.gov.cn",
  "avatar": "https://robohash.org/etveritatisquia.bmp?size=50x50&set=set1"
}, {
  "fullname": "Joscelin Sapp",
  "email": "jsappj@ovh.net",
  "avatar": "https://robohash.org/cumquenihilvoluptatem.png?size=50x50&set=set1"
}, {
  "fullname": "Celestia Freeman",
  "email": "cfreemank@wix.com",
  "avatar": "https://robohash.org/fugitquivel.bmp?size=50x50&set=set1"
}, {
  "fullname": "Cassandry Ravelus",
  "email": "cravelusl@addtoany.com",
  "avatar": "https://robohash.org/quiavoluptatemaliquid.png?size=50x50&set=set1"
}, {
  "fullname": "Josephine Clarycott",
  "email": "jclarycottm@vistaprint.com",
  "avatar": "https://robohash.org/dolorquaeratex.jpg?size=50x50&set=set1"
}, {
  "fullname": "Guilbert Gleadhall",
  "email": "ggleadhalln@jiathis.com",
  "avatar": "https://robohash.org/blanditiisvitaesuscipit.png?size=50x50&set=set1"
}, {
  "fullname": "Thebault Baynton",
  "email": "tbayntono@technorati.com",
  "avatar": "https://robohash.org/sittotamvelit.jpg?size=50x50&set=set1"
}, {
  "fullname": "Ginger Broggini",
  "email": "gbrogginip@washingtonpost.com",
  "avatar": "https://robohash.org/etquifacere.png?size=50x50&set=set1"
}, {
  "fullname": "Phebe Welland",
  "email": "pwellandq@slashdot.org",
  "avatar": "https://robohash.org/perspiciatisessedebitis.png?size=50x50&set=set1"
}, {
  "fullname": "Margeaux Halston",
  "email": "mhalstonr@networkadvertising.org",
  "avatar": "https://robohash.org/maioresquibusdamaccusamus.png?size=50x50&set=set1"
}, {
  "fullname": "Abraham Crossan",
  "email": "acrossans@wikia.com",
  "avatar": "https://robohash.org/quaedeseruntest.png?size=50x50&set=set1"
}, {
  "fullname": "Howard Brugemann",
  "email": "hbrugemannt@icq.com",
  "avatar": "https://robohash.org/nullamaioresillo.jpg?size=50x50&set=set1"
}, {
  "fullname": "Bronny Rounds",
  "email": "broundsu@eventbrite.com",
  "avatar": "https://robohash.org/quorepellendusqui.png?size=50x50&set=set1"
}, {
  "fullname": "Cordy Kelf",
  "email": "ckelfv@miibeian.gov.cn",
  "avatar": "https://robohash.org/etautemeum.png?size=50x50&set=set1"
}, {
  "fullname": "Clayton Kapiloff",
  "email": "ckapiloffw@ucoz.ru",
  "avatar": "https://robohash.org/rationeipsadistinctio.jpg?size=50x50&set=set1"
}, {
  "fullname": "Zebedee De Cleyne",
  "email": "zdex@deliciousdays.com",
  "avatar": "https://robohash.org/quislaboreperferendis.bmp?size=50x50&set=set1"
}, {
  "fullname": "Caryl Luggar",
  "email": "cluggary@whitehouse.gov",
  "avatar": "https://robohash.org/sitsequiullam.jpg?size=50x50&set=set1"
}, {
  "fullname": "Ianthe Adolphine",
  "email": "iadolphinez@ebay.co.uk",
  "avatar": "https://robohash.org/providentrecusandaequi.bmp?size=50x50&set=set1"
}, {
  "fullname": "Daphne Burriss",
  "email": "dburriss10@earthlink.net",
  "avatar": "https://robohash.org/eautest.bmp?size=50x50&set=set1"
}, {
  "fullname": "Nanon Marrington",
  "email": "nmarrington11@naver.com",
  "avatar": "https://robohash.org/teneturoptioautem.bmp?size=50x50&set=set1"
}, {
  "fullname": "Malorie Elwin",
  "email": "melwin12@cargocollective.com",
  "avatar": "https://robohash.org/rerumnatustotam.bmp?size=50x50&set=set1"
}, {
  "fullname": "Nerty Wintour",
  "email": "nwintour13@dion.ne.jp",
  "avatar": "https://robohash.org/accusantiumquasiut.bmp?size=50x50&set=set1"
}, {
  "fullname": "Dell Sodo",
  "email": "dsodo14@google.es",
  "avatar": "https://robohash.org/pariaturevenietarchitecto.jpg?size=50x50&set=set1"
}, {
  "fullname": "Constantina Pierucci",
  "email": "cpierucci15@amazon.co.uk",
  "avatar": "https://robohash.org/teneturdoloremquerepellat.bmp?size=50x50&set=set1"
}, {
  "fullname": "Gillian Biford",
  "email": "gbiford16@ebay.co.uk",
  "avatar": "https://robohash.org/etvoluptatemrerum.png?size=50x50&set=set1"
}, {
  "fullname": "Cecile Whifen",
  "email": "cwhifen17@jiathis.com",
  "avatar": "https://robohash.org/liberoquasmagnam.bmp?size=50x50&set=set1"
}, {
  "fullname": "Bronnie Solesbury",
  "email": "bsolesbury18@howstuffworks.com",
  "avatar": "https://robohash.org/solutaametsit.png?size=50x50&set=set1"
}, {
  "fullname": "Rosella Witherington",
  "email": "rwitherington19@dropbox.com",
  "avatar": "https://robohash.org/rerumvoluptatemeos.bmp?size=50x50&set=set1"
}, {
  "fullname": "Marcella Antrag",
  "email": "mantrag1a@apache.org",
  "avatar": "https://robohash.org/repellendusestvoluptas.jpg?size=50x50&set=set1"
}, {
  "fullname": "Philly Grime",
  "email": "pgrime1b@acquirethisname.com",
  "avatar": "https://robohash.org/vitaeuttemporibus.bmp?size=50x50&set=set1"
}, {
  "fullname": "Sheilah Feechum",
  "email": "sfeechum1c@ow.ly",
  "avatar": "https://robohash.org/excepturietsed.bmp?size=50x50&set=set1"
}, {
  "fullname": "Emelda Hentzeler",
  "email": "ehentzeler1d@bloglines.com",
  "avatar": "https://robohash.org/estfacerequia.jpg?size=50x50&set=set1"
}];

var collaborators = _.map(names, item => `${item.fullname} <${item.email}>`);

var titles = [
  'Monsters, Inc.',
  'The Tomb',
  'Saratoga',
  'Stagecoach',
  'Alter Egos',
  'Blind Date',
  'Among Giants',
  'Pale Cocoon (Peiru Kokun)',
  'Disaster L.A.',
  'Dead of the Nite',
  'Leap of Faith',
  'Confessions from a Holiday Camp',
  'Machete Kills (Machete 2)',
  'Dinosaurus!',
  'Student, The (El estudiante)',
  'Lake, A (Un lac)',
  'Two Years at Sea',
  'Night of the Ghouls',
  'Tea For Two',
  'Tokyo Zombie (Tôkyô zonbi)',
  'Fighter, The',
  'Miracle Run',
  'Cure, The',
  'Queen of Hearts',
  'Zindagi Na Milegi Dobara',
  'Dynamite',
  'Harmful Insect (Gaichu)',
  'Opposite of Sex, The',
  'Dear John',
  'Jönssonligan får guldfeber',
  'All the King\'s Men',
  'Entertainer, The',
  'Stepfather, The',
  'Downstairs',
  'Dynamite Girl (Dynamiittityttö)',
  'B-Side',
  'The Suspicious Death of a Minor',
  'The Testimony',
  'Bitter Moon',
  'Donald Glover: Weirdo',
  'Doom',
  'W.R.: Mysteries of the Organism',
  'Running With Scissors',
  'Münchhausen',
  'Machete Maidens Unleashed!',
  'Alice (Neco z Alenky)',
  'In This Our Life',
  'Human Stain, The'
];

var files = [
	'non velit.avi',
	'condimentum curabitur.ppt',
	'consectetuer adipiscing elit.ppt',
	'velit.mpeg',
	'non.xls',
	'bibendum imperdiet.ppt',
	'ac neque duis.xls',
	'id nisl.jpeg',
	'et magnis.avi',
	'ullamcorper.ppt',
	'neque vestibulum.ppt',
	'sed tincidunt.jpeg',
	'interdum.xls',
	'eleifend pede.xls',
	'nisi.mp3',
	'nulla.ppt',
	'pede posuere nonummy.txt',
	'sit.ppt',
	'vel.tiff',
	'suspendisse.ppt',
	'sapien dignissim.jpeg',
	'elit.avi',
	'cras.tiff',
	'mauris vulputate elementum.doc',
	'eget semper.avi',
	'arcu.ppt',
	'dictumst.xls',
	'luctus et.tiff',
	'est.xls',
	'sit amet nunc.png',
	'adipiscing molestie.doc',
	'maecenas.xls',
	'augue vel accumsan.ppt',
	'rutrum neque.ppt',
	'aliquet ultrices.ppt',
	'nisi.tiff',
	'lorem ipsum.avi',
	'odio.avi',
	'morbi odio.mp3',
	'id.ppt',
	'eget eleifend luctus.jpeg',
	'in congue etiam.mp3',
	'semper rutrum nulla.mp3',
	'aenean.mov',
	'faucibus orci.gif',
	'aliquam erat.xls',
	'etiam.mpeg',
	'sodales scelerisque mauris.avi',
	'lobortis.xls',
	'aliquam augue quam.jpeg'
];

var sources = [{
  "author": "Ebonee Fendlen",
  "reference": "http://soup.io/lacinia/aenean/sit/amet/justo/morbi/ut.jsp?lobortis=accumsan&ligula=tellus&sit=nisi&amet=eu&eleifend=orci&pede=mauris"
}, {
  "author": "Abie Bussy",
  "reference": "https://spiegel.de/pede.js?molestie=massa&hendrerit=tempor&at=convallis&vulputate=nulla&vitae=neque&nisl=libero&aenean=convallis&lectus=eget"
}, {
  "author": "Gail Matousek",
  "reference": "http://tumblr.com/in.aspx?volutpat=enim&erat=in&quisque=tempor&erat=turpis&eros=nec&viverra=euismod&eget=scelerisque&congue=quam&eget=turpis&semper=adipiscing&rutrum=lorem&nulla=vitae&nunc=mattis&purus=nibh&phasellus=ligula&in=nec&felis=sem&donec=duis&semper=aliquam&sapien=convallis&a=nunc&libero=proin&nam=at&dui=turpis&proin=a&leo=pede&odio=posuere&porttitor=nonummy&id=integer&consequat=non&in=velit&consequat=donec&ut=diam&nulla=neque&sed=vestibulum&accumsan=eget&felis=vulputate&ut=ut&at=ultrices&dolor=vel&quis=augue&odio=vestibulum&consequat=ante&varius=ipsum&integer=primis&ac=in&leo=faucibus&pellentesque=orci&ultrices=luctus&mattis=et&odio=ultrices&donec=posuere&vitae=cubilia&nisi=curae&nam=donec&ultrices=pharetra&libero=magna&non=vestibulum&mattis=aliquet&pulvinar=ultrices&nulla=erat&pede=tortor&ullamcorper=sollicitudin&augue=mi&a=sit&suscipit=amet&nulla=lobortis&elit=sapien&ac=sapien&nulla=non&sed=mi&vel=integer&enim=ac&sit=neque&amet=duis&nunc=bibendum&viverra=morbi&dapibus=non&nulla=quam&suscipit=nec&ligula=dui&in=luctus&lacus=rutrum&curabitur=nulla&at=tellus&ipsum=in"
}, {
  "author": "Consuelo Ivashintsov",
  "reference": "https://princeton.edu/eget.js?dis=nisi&parturient=volutpat&montes=eleifend&nascetur=donec&ridiculus=ut&mus=dolor&vivamus=morbi&vestibulum=vel&sagittis=lectus&sapien=in&cum=quam&sociis=fringilla&natoque=rhoncus&penatibus=mauris&et=enim&magnis=leo&dis=rhoncus&parturient=sed&montes=vestibulum&nascetur=sit&ridiculus=amet&mus=cursus&etiam=id&vel=turpis&augue=integer&vestibulum=aliquet&rutrum=massa&rutrum=id&neque=lobortis&aenean=convallis&auctor=tortor&gravida=risus&sem=dapibus&praesent=augue&id=vel&massa=accumsan&id=tellus&nisl=nisi&venenatis=eu&lacinia=orci&aenean=mauris&sit=lacinia&amet=sapien&justo=quis&morbi=libero&ut=nullam&odio=sit&cras=amet&mi=turpis&pede=elementum&malesuada=ligula&in=vehicula&imperdiet=consequat&et=morbi&commodo=a&vulputate=ipsum&justo=integer&in=a&blandit=nibh&ultrices=in&enim=quis&lorem=justo&ipsum=maecenas&dolor=rhoncus&sit=aliquam"
}, {
  "author": "Oran Capewell",
  "reference": "http://upenn.edu/tellus/semper/interdum/mauris/ullamcorper/purus.js?ante=nascetur&vestibulum=ridiculus&ante=mus&ipsum=vivamus&primis=vestibulum&in=sagittis&faucibus=sapien&orci=cum&luctus=sociis&et=natoque&ultrices=penatibus&posuere=et&cubilia=magnis&curae=dis&duis=parturient&faucibus=montes&accumsan=nascetur&odio=ridiculus&curabitur=mus&convallis=etiam&duis=vel&consequat=augue&dui=vestibulum&nec=rutrum&nisi=rutrum&volutpat=neque&eleifend=aenean&donec=auctor&ut=gravida&dolor=sem&morbi=praesent&vel=id&lectus=massa&in=id&quam=nisl&fringilla=venenatis&rhoncus=lacinia&mauris=aenean&enim=sit&leo=amet&rhoncus=justo&sed=morbi&vestibulum=ut&sit=odio&amet=cras&cursus=mi&id=pede&turpis=malesuada&integer=in&aliquet=imperdiet&massa=et&id=commodo&lobortis=vulputate&convallis=justo&tortor=in&risus=blandit&dapibus=ultrices&augue=enim&vel=lorem&accumsan=ipsum&tellus=dolor&nisi=sit&eu=amet&orci=consectetuer&mauris=adipiscing&lacinia=elit&sapien=proin&quis=interdum&libero=mauris&nullam=non&sit=ligula&amet=pellentesque&turpis=ultrices&elementum=phasellus&ligula=id&vehicula=sapien&consequat=in&morbi=sapien&a=iaculis&ipsum=congue&integer=vivamus"
}, {
  "author": "Dynah Detloff",
  "reference": "http://newsvine.com/nulla/suspendisse/potenti/cras/in.xml?in=ante&lectus=ipsum&pellentesque=primis&at=in&nulla=faucibus&suspendisse=orci&potenti=luctus&cras=et&in=ultrices&purus=posuere&eu=cubilia&magna=curae&vulputate=mauris&luctus=viverra&cum=diam&sociis=vitae&natoque=quam&penatibus=suspendisse&et=potenti&magnis=nullam&dis=porttitor&parturient=lacus&montes=at&nascetur=turpis&ridiculus=donec&mus=posuere&vivamus=metus&vestibulum=vitae&sagittis=ipsum&sapien=aliquam&cum=non&sociis=mauris&natoque=morbi&penatibus=non&et=lectus&magnis=aliquam&dis=sit&parturient=amet&montes=diam&nascetur=in&ridiculus=magna&mus=bibendum&etiam=imperdiet&vel=nullam&augue=orci&vestibulum=pede&rutrum=venenatis&rutrum=non&neque=sodales&aenean=sed&auctor=tincidunt&gravida=eu&sem=felis&praesent=fusce&id=posuere&massa=felis&id=sed&nisl=lacus&venenatis=morbi&lacinia=sem&aenean=mauris"
}, {
  "author": "Claresta Cobbin",
  "reference": "https://mediafire.com/sodales/scelerisque/mauris/sit.aspx?sapien=ac&cursus=tellus&vestibulum=semper&proin=interdum&eu=mauris&mi=ullamcorper&nulla=purus&ac=sit&enim=amet"
}, {
  "author": "Kelci Silverson",
  "reference": "http://sakura.ne.jp/parturient.jsp?lorem=ultrices&integer=posuere"
}, {
  "author": "Darlleen Bazylets",
  "reference": "https://artisteer.com/cras/non/velit/nec/nisi/vulputate.json?in=in&quis=tempor&justo=turpis&maecenas=nec&rhoncus=euismod&aliquam=scelerisque&lacus=quam&morbi=turpis&quis=adipiscing&tortor=lorem&id=vitae&nulla=mattis&ultrices=nibh&aliquet=ligula&maecenas=nec&leo=sem&odio=duis&condimentum=aliquam&id=convallis&luctus=nunc&nec=proin&molestie=at&sed=turpis&justo=a&pellentesque=pede&viverra=posuere&pede=nonummy&ac=integer&diam=non&cras=velit&pellentesque=donec&volutpat=diam&dui=neque&maecenas=vestibulum&tristique=eget&est=vulputate&et=ut&tempus=ultrices&semper=vel&est=augue&quam=vestibulum&pharetra=ante&magna=ipsum&ac=primis&consequat=in&metus=faucibus&sapien=orci&ut=luctus&nunc=et&vestibulum=ultrices&ante=posuere&ipsum=cubilia&primis=curae&in=donec&faucibus=pharetra&orci=magna&luctus=vestibulum&et=aliquet&ultrices=ultrices&posuere=erat&cubilia=tortor&curae=sollicitudin&mauris=mi&viverra=sit&diam=amet&vitae=lobortis&quam=sapien&suspendisse=sapien&potenti=non&nullam=mi&porttitor=integer&lacus=ac&at=neque&turpis=duis&donec=bibendum&posuere=morbi&metus=non&vitae=quam&ipsum=nec&aliquam=dui&non=luctus&mauris=rutrum"
}, {
  "author": "Ajay Chrisp",
  "reference": "https://livejournal.com/nam.aspx?sapien=sem&iaculis=praesent&congue=id&vivamus=massa&metus=id&arcu=nisl&adipiscing=venenatis&molestie=lacinia&hendrerit=aenean&at=sit&vulputate=amet&vitae=justo&nisl=morbi&aenean=ut&lectus=odio&pellentesque=cras&eget=mi&nunc=pede&donec=malesuada&quis=in&orci=imperdiet&eget=et&orci=commodo&vehicula=vulputate&condimentum=justo&curabitur=in&in=blandit&libero=ultrices&ut=enim&massa=lorem&volutpat=ipsum&convallis=dolor&morbi=sit&odio=amet&odio=consectetuer&elementum=adipiscing&eu=elit&interdum=proin&eu=interdum&tincidunt=mauris&in=non&leo=ligula&maecenas=pellentesque&pulvinar=ultrices&lobortis=phasellus&est=id&phasellus=sapien&sit=in&amet=sapien&erat=iaculis&nulla=congue&tempus=vivamus&vivamus=metus&in=arcu&felis=adipiscing&eu=molestie&sapien=hendrerit&cursus=at&vestibulum=vulputate&proin=vitae&eu=nisl&mi=aenean&nulla=lectus&ac=pellentesque&enim=eget&in=nunc&tempor=donec&turpis=quis&nec=orci&euismod=eget&scelerisque=orci&quam=vehicula&turpis=condimentum&adipiscing=curabitur&lorem=in&vitae=libero&mattis=ut&nibh=massa&ligula=volutpat&nec=convallis&sem=morbi&duis=odio&aliquam=odio&convallis=elementum&nunc=eu&proin=interdum&at=eu&turpis=tincidunt&a=in"
}, {
  "author": "Tremaine Pinfold",
  "reference": "https://lulu.com/blandit/mi/in/porttitor/pede.js?id=ut&nulla=mauris&ultrices=eget&aliquet=massa&maecenas=tempor&leo=convallis&odio=nulla&condimentum=neque&id=libero&luctus=convallis&nec=eget&molestie=eleifend&sed=luctus&justo=ultricies&pellentesque=eu&viverra=nibh&pede=quisque&ac=id&diam=justo&cras=sit"
}, {
  "author": "Chery Fain",
  "reference": "https://amazon.co.jp/sapien.jsp?volutpat=ligula&eleifend=suspendisse&donec=ornare&ut=consequat&dolor=lectus&morbi=in&vel=est&lectus=risus&in=auctor&quam=sed&fringilla=tristique&rhoncus=in&mauris=tempus&enim=sit&leo=amet&rhoncus=sem&sed=fusce&vestibulum=consequat&sit=nulla&amet=nisl&cursus=nunc&id=nisl&turpis=duis&integer=bibendum&aliquet=felis&massa=sed&id=interdum&lobortis=venenatis&convallis=turpis&tortor=enim&risus=blandit&dapibus=mi&augue=in&vel=porttitor&accumsan=pede&tellus=justo&nisi=eu&eu=massa&orci=donec&mauris=dapibus&lacinia=duis&sapien=at&quis=velit&libero=eu&nullam=est&sit=congue&amet=elementum&turpis=in&elementum=hac&ligula=habitasse&vehicula=platea&consequat=dictumst&morbi=morbi&a=vestibulum&ipsum=velit&integer=id&a=pretium&nibh=iaculis&in=diam&quis=erat"
}, {
  "author": "Kevina Box",
  "reference": "http://google.fr/sodales/scelerisque/mauris/sit/amet/eros.aspx?donec=lacinia&posuere=eget&metus=tincidunt&vitae=eget&ipsum=tempus&aliquam=vel&non=pede&mauris=morbi&morbi=porttitor&non=lorem&lectus=id&aliquam=ligula&sit=suspendisse&amet=ornare&diam=consequat&in=lectus&magna=in&bibendum=est&imperdiet=risus&nullam=auctor&orci=sed&pede=tristique&venenatis=in&non=tempus&sodales=sit&sed=amet&tincidunt=sem&eu=fusce&felis=consequat&fusce=nulla&posuere=nisl&felis=nunc&sed=nisl&lacus=duis&morbi=bibendum&sem=felis&mauris=sed"
}, {
  "author": "Archibaldo McGettrick",
  "reference": "http://odnoklassniki.ru/est.xml?lorem=dictumst&ipsum=aliquam&dolor=augue&sit=quam&amet=sollicitudin&consectetuer=vitae&adipiscing=consectetuer&elit=eget&proin=rutrum&interdum=at&mauris=lorem&non=integer&ligula=tincidunt&pellentesque=ante&ultrices=vel&phasellus=ipsum&id=praesent&sapien=blandit&in=lacinia&sapien=erat&iaculis=vestibulum&congue=sed&vivamus=magna&metus=at&arcu=nunc&adipiscing=commodo&molestie=placerat&hendrerit=praesent&at=blandit&vulputate=nam&vitae=nulla&nisl=integer&aenean=pede&lectus=justo&pellentesque=lacinia&eget=eget&nunc=tincidunt&donec=eget&quis=tempus&orci=vel&eget=pede&orci=morbi&vehicula=porttitor&condimentum=lorem&curabitur=id&in=ligula&libero=suspendisse&ut=ornare&massa=consequat&volutpat=lectus&convallis=in&morbi=est&odio=risus&odio=auctor&elementum=sed&eu=tristique&interdum=in&eu=tempus&tincidunt=sit&in=amet&leo=sem&maecenas=fusce&pulvinar=consequat&lobortis=nulla&est=nisl&phasellus=nunc&sit=nisl&amet=duis&erat=bibendum&nulla=felis&tempus=sed&vivamus=interdum&in=venenatis&felis=turpis&eu=enim&sapien=blandit&cursus=mi&vestibulum=in&proin=porttitor&eu=pede&mi=justo&nulla=eu&ac=massa"
}, {
  "author": "Jesselyn Waugh",
  "reference": "https://blogs.com/quisque.aspx?orci=eu&luctus=interdum&et=eu&ultrices=tincidunt&posuere=in&cubilia=leo&curae=maecenas&nulla=pulvinar&dapibus=lobortis&dolor=est&vel=phasellus&est=sit&donec=amet&odio=erat&justo=nulla&sollicitudin=tempus&ut=vivamus&suscipit=in&a=felis&feugiat=eu&et=sapien&eros=cursus&vestibulum=vestibulum&ac=proin&est=eu&lacinia=mi&nisi=nulla&venenatis=ac&tristique=enim&fusce=in&congue=tempor&diam=turpis&id=nec&ornare=euismod&imperdiet=scelerisque&sapien=quam&urna=turpis&pretium=adipiscing&nisl=lorem&ut=vitae&volutpat=mattis&sapien=nibh&arcu=ligula&sed=nec&augue=sem&aliquam=duis&erat=aliquam&volutpat=convallis&in=nunc&congue=proin&etiam=at&justo=turpis&etiam=a&pretium=pede&iaculis=posuere&justo=nonummy"
}, {
  "author": "Aluin Angric",
  "reference": "http://netvibes.com/et/commodo/vulputate/justo/in.jsp?curae=ac&donec=consequat&pharetra=metus&magna=sapien&vestibulum=ut&aliquet=nunc&ultrices=vestibulum&erat=ante&tortor=ipsum&sollicitudin=primis&mi=in&sit=faucibus&amet=orci&lobortis=luctus&sapien=et&sapien=ultrices&non=posuere&mi=cubilia&integer=curae&ac=mauris&neque=viverra&duis=diam&bibendum=vitae&morbi=quam&non=suspendisse&quam=potenti&nec=nullam&dui=porttitor&luctus=lacus&rutrum=at&nulla=turpis&tellus=donec&in=posuere&sagittis=metus&dui=vitae&vel=ipsum&nisl=aliquam&duis=non&ac=mauris&nibh=morbi&fusce=non&lacus=lectus&purus=aliquam&aliquet=sit&at=amet&feugiat=diam&non=in&pretium=magna&quis=bibendum&lectus=imperdiet&suspendisse=nullam&potenti=orci&in=pede&eleifend=venenatis&quam=non&a=sodales&odio=sed&in=tincidunt&hac=eu&habitasse=felis&platea=fusce&dictumst=posuere&maecenas=felis"
}, {
  "author": "Rodolphe Tolley",
  "reference": "http://tripod.com/posuere/cubilia/curae/mauris.aspx?at=non&nunc=quam&commodo=nec&placerat=dui&praesent=luctus&blandit=rutrum"
}, {
  "author": "Cosette Jordine",
  "reference": "http://rediff.com/id.jsp?curabitur=sit&gravida=amet&nisi=turpis&at=elementum&nibh=ligula&in=vehicula&hac=consequat&habitasse=morbi&platea=a&dictumst=ipsum&aliquam=integer&augue=a&quam=nibh&sollicitudin=in&vitae=quis&consectetuer=justo&eget=maecenas&rutrum=rhoncus&at=aliquam&lorem=lacus&integer=morbi&tincidunt=quis&ante=tortor&vel=id&ipsum=nulla&praesent=ultrices&blandit=aliquet&lacinia=maecenas&erat=leo&vestibulum=odio&sed=condimentum&magna=id&at=luctus&nunc=nec&commodo=molestie&placerat=sed&praesent=justo&blandit=pellentesque&nam=viverra&nulla=pede&integer=ac&pede=diam&justo=cras&lacinia=pellentesque&eget=volutpat&tincidunt=dui&eget=maecenas&tempus=tristique&vel=est&pede=et&morbi=tempus&porttitor=semper&lorem=est&id=quam&ligula=pharetra&suspendisse=magna&ornare=ac&consequat=consequat&lectus=metus&in=sapien&est=ut&risus=nunc&auctor=vestibulum&sed=ante"
}, {
  "author": "Jaimie Float",
  "reference": "http://guardian.co.uk/ut/erat/curabitur/gravida.jpg?scelerisque=ipsum&mauris=ac&sit=tellus&amet=semper"
}, {
  "author": "Karin Woolerton",
  "reference": "https://indiatimes.com/ut/volutpat/sapien/arcu/sed/augue.png?orci=neque&vehicula=duis&condimentum=bibendum&curabitur=morbi&in=non&libero=quam&ut=nec&massa=dui&volutpat=luctus&convallis=rutrum&morbi=nulla&odio=tellus&odio=in&elementum=sagittis&eu=dui&interdum=vel&eu=nisl&tincidunt=duis&in=ac&leo=nibh&maecenas=fusce&pulvinar=lacus&lobortis=purus&est=aliquet&phasellus=at&sit=feugiat&amet=non&erat=pretium&nulla=quis&tempus=lectus&vivamus=suspendisse&in=potenti&felis=in&eu=eleifend&sapien=quam&cursus=a&vestibulum=odio&proin=in&eu=hac&mi=habitasse&nulla=platea&ac=dictumst&enim=maecenas"
}, {
  "author": "Nicola Embery",
  "reference": "http://google.com.hk/sapien/arcu/sed/augue/aliquam/erat.xml?vel=mauris&est=vulputate&donec=elementum&odio=nullam&justo=varius&sollicitudin=nulla&ut=facilisi&suscipit=cras&a=non&feugiat=velit&et=nec&eros=nisi&vestibulum=vulputate&ac=nonummy&est=maecenas&lacinia=tincidunt&nisi=lacus&venenatis=at&tristique=velit&fusce=vivamus&congue=vel&diam=nulla&id=eget&ornare=eros&imperdiet=elementum&sapien=pellentesque&urna=quisque&pretium=porta&nisl=volutpat&ut=erat&volutpat=quisque"
}, {
  "author": "Darleen Stalf",
  "reference": "https://geocities.com/sit/amet/nunc/viverra.html?quis=at&turpis=nibh&sed=in&ante=hac&vivamus=habitasse&tortor=platea&duis=dictumst&mattis=aliquam&egestas=augue&metus=quam&aenean=sollicitudin&fermentum=vitae&donec=consectetuer&ut=eget&mauris=rutrum&eget=at&massa=lorem&tempor=integer&convallis=tincidunt&nulla=ante&neque=vel&libero=ipsum&convallis=praesent&eget=blandit&eleifend=lacinia&luctus=erat"
}, {
  "author": "Wilhelmina Dodswell",
  "reference": "http://seattletimes.com/hac.png?bibendum=id&felis=pretium&sed=iaculis&interdum=diam&venenatis=erat&turpis=fermentum&enim=justo&blandit=nec&mi=condimentum&in=neque&porttitor=sapien&pede=placerat&justo=ante&eu=nulla&massa=justo&donec=aliquam&dapibus=quis&duis=turpis&at=eget&velit=elit&eu=sodales"
}, {
  "author": "Monro Hatwells",
  "reference": "http://va.gov/in/sagittis/dui/vel.jsp?nunc=tempus&nisl=sit&duis=amet&bibendum=sem&felis=fusce&sed=consequat&interdum=nulla&venenatis=nisl&turpis=nunc&enim=nisl&blandit=duis&mi=bibendum&in=felis&porttitor=sed&pede=interdum&justo=venenatis&eu=turpis&massa=enim&donec=blandit&dapibus=mi&duis=in&at=porttitor&velit=pede&eu=justo&est=eu&congue=massa&elementum=donec&in=dapibus&hac=duis&habitasse=at&platea=velit&dictumst=eu&morbi=est&vestibulum=congue&velit=elementum&id=in&pretium=hac&iaculis=habitasse&diam=platea"
}, {
  "author": "Leicester Hansell",
  "reference": "https://purevolume.com/mus/vivamus.js?euismod=nulla&scelerisque=justo&quam=aliquam&turpis=quis&adipiscing=turpis&lorem=eget&vitae=elit&mattis=sodales&nibh=scelerisque&ligula=mauris&nec=sit&sem=amet&duis=eros&aliquam=suspendisse&convallis=accumsan&nunc=tortor&proin=quis&at=turpis&turpis=sed&a=ante&pede=vivamus&posuere=tortor&nonummy=duis&integer=mattis&non=egestas&velit=metus&donec=aenean&diam=fermentum&neque=donec&vestibulum=ut&eget=mauris&vulputate=eget&ut=massa&ultrices=tempor&vel=convallis&augue=nulla&vestibulum=neque&ante=libero"
}, {
  "author": "Porter Weatherburn",
  "reference": "http://chicagotribune.com/odio.js?amet=nibh"
}, {
  "author": "Daryl Keeri",
  "reference": "http://dropbox.com/mauris.html?justo=in&sit=est&amet=risus&sapien=auctor&dignissim=sed&vestibulum=tristique&vestibulum=in&ante=tempus&ipsum=sit&primis=amet&in=sem&faucibus=fusce&orci=consequat&luctus=nulla&et=nisl&ultrices=nunc&posuere=nisl&cubilia=duis&curae=bibendum&nulla=felis&dapibus=sed&dolor=interdum&vel=venenatis&est=turpis&donec=enim&odio=blandit&justo=mi&sollicitudin=in&ut=porttitor&suscipit=pede&a=justo&feugiat=eu&et=massa&eros=donec&vestibulum=dapibus&ac=duis&est=at&lacinia=velit&nisi=eu&venenatis=est&tristique=congue&fusce=elementum"
}, {
  "author": "Nicko Garbert",
  "reference": "http://sciencedaily.com/augue/aliquam/erat/volutpat/in/congue/etiam.jpg?amet=nulla&sem=integer&fusce=pede&consequat=justo&nulla=lacinia&nisl=eget&nunc=tincidunt&nisl=eget&duis=tempus&bibendum=vel&felis=pede&sed=morbi&interdum=porttitor&venenatis=lorem&turpis=id&enim=ligula&blandit=suspendisse&mi=ornare&in=consequat&porttitor=lectus&pede=in&justo=est&eu=risus&massa=auctor&donec=sed&dapibus=tristique&duis=in&at=tempus&velit=sit&eu=amet&est=sem&congue=fusce&elementum=consequat&in=nulla&hac=nisl&habitasse=nunc&platea=nisl&dictumst=duis&morbi=bibendum&vestibulum=felis&velit=sed"
}, {
  "author": "Chiarra Jacmar",
  "reference": "https://nhs.uk/augue.aspx?felis=praesent&sed=lectus&interdum=vestibulum&venenatis=quam&turpis=sapien&enim=varius&blandit=ut&mi=blandit&in=non&porttitor=interdum&pede=in&justo=ante&eu=vestibulum&massa=ante&donec=ipsum&dapibus=primis&duis=in&at=faucibus&velit=orci&eu=luctus&est=et&congue=ultrices&elementum=posuere&in=cubilia&hac=curae&habitasse=duis&platea=faucibus&dictumst=accumsan&morbi=odio&vestibulum=curabitur&velit=convallis&id=duis&pretium=consequat&iaculis=dui&diam=nec&erat=nisi&fermentum=volutpat&justo=eleifend&nec=donec&condimentum=ut&neque=dolor&sapien=morbi&placerat=vel&ante=lectus&nulla=in&justo=quam&aliquam=fringilla&quis=rhoncus&turpis=mauris&eget=enim&elit=leo&sodales=rhoncus&scelerisque=sed&mauris=vestibulum&sit=sit"
}, {
  "author": "Harwilll Kalb",
  "reference": "http://google.es/diam/neque.jpg?massa=quis&quis=augue&augue=luctus&luctus=tincidunt&tincidunt=nulla&nulla=mollis&mollis=molestie&molestie=lorem&lorem=quisque&quisque=ut&ut=erat&erat=curabitur&curabitur=gravida&gravida=nisi&nisi=at&at=nibh&nibh=in&in=hac&hac=habitasse&habitasse=platea&platea=dictumst&dictumst=aliquam&aliquam=augue&augue=quam&quam=sollicitudin&sollicitudin=vitae&vitae=consectetuer&consectetuer=eget&eget=rutrum&rutrum=at&at=lorem&lorem=integer&integer=tincidunt&tincidunt=ante&ante=vel&vel=ipsum&ipsum=praesent&praesent=blandit&blandit=lacinia&lacinia=erat&erat=vestibulum&vestibulum=sed&sed=magna&magna=at&at=nunc&nunc=commodo&commodo=placerat&placerat=praesent&praesent=blandit&blandit=nam&nam=nulla&nulla=integer&integer=pede&pede=justo&justo=lacinia&lacinia=eget&eget=tincidunt&tincidunt=eget&eget=tempus&tempus=vel&vel=pede&pede=morbi&morbi=porttitor&porttitor=lorem&lorem=id&id=ligula&ligula=suspendisse&suspendisse=ornare&ornare=consequat&consequat=lectus&lectus=in&in=est&est=risus&risus=auctor&auctor=sed&sed=tristique&tristique=in&in=tempus&tempus=sit&sit=amet&amet=sem&sem=fusce"
}, {
  "author": "Cornelius Pulsford",
  "reference": "http://mac.com/donec/ut/mauris/eget/massa/tempor.png?id=orci&sapien=eget&in=orci&sapien=vehicula&iaculis=condimentum&congue=curabitur&vivamus=in&metus=libero&arcu=ut&adipiscing=massa&molestie=volutpat&hendrerit=convallis&at=morbi&vulputate=odio&vitae=odio&nisl=elementum&aenean=eu&lectus=interdum&pellentesque=eu&eget=tincidunt&nunc=in&donec=leo&quis=maecenas&orci=pulvinar&eget=lobortis&orci=est&vehicula=phasellus&condimentum=sit&curabitur=amet&in=erat&libero=nulla&ut=tempus&massa=vivamus&volutpat=in&convallis=felis&morbi=eu&odio=sapien&odio=cursus&elementum=vestibulum&eu=proin&interdum=eu&eu=mi&tincidunt=nulla&in=ac&leo=enim&maecenas=in&pulvinar=tempor&lobortis=turpis&est=nec&phasellus=euismod&sit=scelerisque&amet=quam&erat=turpis&nulla=adipiscing&tempus=lorem&vivamus=vitae&in=mattis&felis=nibh&eu=ligula&sapien=nec&cursus=sem&vestibulum=duis&proin=aliquam&eu=convallis&mi=nunc&nulla=proin&ac=at&enim=turpis&in=a&tempor=pede&turpis=posuere"
}, {
  "author": "Nadean Romanski",
  "reference": "http://army.mil/potenti.html?et=justo&eros=sit&vestibulum=amet&ac=sapien&est=dignissim&lacinia=vestibulum&nisi=vestibulum&venenatis=ante&tristique=ipsum&fusce=primis&congue=in&diam=faucibus&id=orci&ornare=luctus&imperdiet=et&sapien=ultrices&urna=posuere&pretium=cubilia&nisl=curae&ut=nulla&volutpat=dapibus&sapien=dolor&arcu=vel&sed=est&augue=donec&aliquam=odio&erat=justo&volutpat=sollicitudin&in=ut&congue=suscipit&etiam=a&justo=feugiat&etiam=et&pretium=eros&iaculis=vestibulum&justo=ac&in=est&hac=lacinia&habitasse=nisi&platea=venenatis&dictumst=tristique&etiam=fusce&faucibus=congue&cursus=diam&urna=id&ut=ornare&tellus=imperdiet&nulla=sapien&ut=urna&erat=pretium&id=nisl&mauris=ut&vulputate=volutpat&elementum=sapien&nullam=arcu&varius=sed&nulla=augue&facilisi=aliquam&cras=erat&non=volutpat&velit=in&nec=congue&nisi=etiam&vulputate=justo&nonummy=etiam&maecenas=pretium&tincidunt=iaculis&lacus=justo&at=in&velit=hac&vivamus=habitasse&vel=platea&nulla=dictumst&eget=etiam"
}, {
  "author": "Cecelia Kelley",
  "reference": "https://skype.com/nec/sem.json?in=nec"
}, {
  "author": "Frederik Di Matteo",
  "reference": "https://php.net/sem/praesent/id/massa.png?lorem=at&vitae=turpis&mattis=a&nibh=pede&ligula=posuere&nec=nonummy&sem=integer&duis=non&aliquam=velit&convallis=donec&nunc=diam&proin=neque&at=vestibulum&turpis=eget&a=vulputate&pede=ut&posuere=ultrices&nonummy=vel&integer=augue&non=vestibulum&velit=ante&donec=ipsum&diam=primis&neque=in&vestibulum=faucibus&eget=orci&vulputate=luctus&ut=et&ultrices=ultrices&vel=posuere&augue=cubilia&vestibulum=curae&ante=donec&ipsum=pharetra&primis=magna&in=vestibulum&faucibus=aliquet&orci=ultrices&luctus=erat&et=tortor&ultrices=sollicitudin&posuere=mi&cubilia=sit&curae=amet&donec=lobortis&pharetra=sapien&magna=sapien&vestibulum=non&aliquet=mi&ultrices=integer&erat=ac&tortor=neque&sollicitudin=duis&mi=bibendum&sit=morbi&amet=non&lobortis=quam&sapien=nec&sapien=dui&non=luctus&mi=rutrum&integer=nulla&ac=tellus&neque=in&duis=sagittis&bibendum=dui&morbi=vel&non=nisl&quam=duis&nec=ac&dui=nibh&luctus=fusce&rutrum=lacus&nulla=purus&tellus=aliquet&in=at&sagittis=feugiat&dui=non&vel=pretium&nisl=quis&duis=lectus&ac=suspendisse&nibh=potenti&fusce=in&lacus=eleifend&purus=quam&aliquet=a&at=odio"
}, {
  "author": "Redd Rothschild",
  "reference": "https://msn.com/sed/tincidunt/eu/felis.jsp?tempus=quis&semper=libero&est=nullam&quam=sit&pharetra=amet&magna=turpis&ac=elementum&consequat=ligula&metus=vehicula&sapien=consequat&ut=morbi&nunc=a&vestibulum=ipsum&ante=integer&ipsum=a&primis=nibh&in=in&faucibus=quis&orci=justo&luctus=maecenas&et=rhoncus&ultrices=aliquam&posuere=lacus&cubilia=morbi&curae=quis&mauris=tortor&viverra=id&diam=nulla&vitae=ultrices&quam=aliquet&suspendisse=maecenas&potenti=leo&nullam=odio&porttitor=condimentum&lacus=id&at=luctus&turpis=nec&donec=molestie&posuere=sed&metus=justo&vitae=pellentesque&ipsum=viverra"
}, {
  "author": "Michelina Duffet",
  "reference": "https://adobe.com/venenatis/tristique/fusce/congue/diam/id/ornare.json?id=vestibulum&pretium=vestibulum&iaculis=ante&diam=ipsum&erat=primis&fermentum=in&justo=faucibus&nec=orci&condimentum=luctus&neque=et&sapien=ultrices&placerat=posuere&ante=cubilia&nulla=curae&justo=nulla&aliquam=dapibus&quis=dolor&turpis=vel&eget=est&elit=donec&sodales=odio&scelerisque=justo&mauris=sollicitudin&sit=ut&amet=suscipit&eros=a&suspendisse=feugiat&accumsan=et&tortor=eros&quis=vestibulum&turpis=ac&sed=est&ante=lacinia&vivamus=nisi&tortor=venenatis&duis=tristique&mattis=fusce&egestas=congue&metus=diam&aenean=id&fermentum=ornare&donec=imperdiet&ut=sapien"
}, {
  "author": "Dell De Micoli",
  "reference": "http://mozilla.com/nibh/fusce/lacus/purus.js?in=a&consequat=ipsum&ut=integer&nulla=a&sed=nibh&accumsan=in&felis=quis&ut=justo&at=maecenas&dolor=rhoncus&quis=aliquam&odio=lacus&consequat=morbi&varius=quis&integer=tortor&ac=id&leo=nulla&pellentesque=ultrices&ultrices=aliquet&mattis=maecenas&odio=leo&donec=odio&vitae=condimentum&nisi=id&nam=luctus&ultrices=nec&libero=molestie&non=sed&mattis=justo&pulvinar=pellentesque&nulla=viverra"
}, {
  "author": "Ruthanne Moyne",
  "reference": "http://addtoany.com/nascetur/ridiculus/mus/etiam/vel/augue.html?tincidunt=sem&ante=mauris"
}, {
  "author": "Erhart Costock",
  "reference": "https://ucsd.edu/id/sapien.html?mauris=ipsum&morbi=primis&non=in&lectus=faucibus&aliquam=orci&sit=luctus&amet=et&diam=ultrices&in=posuere&magna=cubilia&bibendum=curae&imperdiet=mauris&nullam=viverra&orci=diam&pede=vitae&venenatis=quam&non=suspendisse&sodales=potenti&sed=nullam&tincidunt=porttitor&eu=lacus&felis=at&fusce=turpis&posuere=donec&felis=posuere&sed=metus&lacus=vitae&morbi=ipsum&sem=aliquam&mauris=non&laoreet=mauris&ut=morbi&rhoncus=non&aliquet=lectus&pulvinar=aliquam&sed=sit&nisl=amet&nunc=diam&rhoncus=in&dui=magna&vel=bibendum&sem=imperdiet&sed=nullam&sagittis=orci&nam=pede&congue=venenatis&risus=non&semper=sodales&porta=sed&volutpat=tincidunt&quam=eu&pede=felis&lobortis=fusce&ligula=posuere&sit=felis&amet=sed&eleifend=lacus&pede=morbi&libero=sem&quis=mauris&orci=laoreet&nullam=ut&molestie=rhoncus&nibh=aliquet&in=pulvinar&lectus=sed&pellentesque=nisl&at=nunc&nulla=rhoncus&suspendisse=dui&potenti=vel&cras=sem"
}, {
  "author": "Kathe Titherington",
  "reference": "http://howstuffworks.com/purus/sit/amet.aspx?vulputate=lacinia&ut=sapien&ultrices=quis&vel=libero&augue=nullam&vestibulum=sit&ante=amet&ipsum=turpis&primis=elementum&in=ligula&faucibus=vehicula&orci=consequat&luctus=morbi&et=a&ultrices=ipsum&posuere=integer&cubilia=a&curae=nibh&donec=in&pharetra=quis&magna=justo&vestibulum=maecenas&aliquet=rhoncus&ultrices=aliquam&erat=lacus&tortor=morbi&sollicitudin=quis&mi=tortor&sit=id&amet=nulla&lobortis=ultrices&sapien=aliquet&sapien=maecenas&non=leo&mi=odio&integer=condimentum"
}, {
  "author": "Eloise Borrell",
  "reference": "https://nbcnews.com/eget/eleifend/luctus/ultricies/eu.jsp?pretium=dui&iaculis=vel&justo=nisl&in=duis&hac=ac&habitasse=nibh&platea=fusce&dictumst=lacus&etiam=purus&faucibus=aliquet&cursus=at&urna=feugiat&ut=non&tellus=pretium&nulla=quis&ut=lectus&erat=suspendisse&id=potenti&mauris=in&vulputate=eleifend&elementum=quam&nullam=a&varius=odio&nulla=in&facilisi=hac&cras=habitasse&non=platea&velit=dictumst&nec=maecenas&nisi=ut&vulputate=massa&nonummy=quis&maecenas=augue&tincidunt=luctus&lacus=tincidunt&at=nulla&velit=mollis&vivamus=molestie&vel=lorem&nulla=quisque&eget=ut&eros=erat&elementum=curabitur&pellentesque=gravida&quisque=nisi&porta=at&volutpat=nibh&erat=in&quisque=hac&erat=habitasse&eros=platea&viverra=dictumst&eget=aliquam&congue=augue&eget=quam&semper=sollicitudin&rutrum=vitae&nulla=consectetuer&nunc=eget&purus=rutrum&phasellus=at&in=lorem&felis=integer&donec=tincidunt&semper=ante&sapien=vel&a=ipsum&libero=praesent"
}, {
  "author": "Scot Leale",
  "reference": "http://sphinn.com/id/mauris/vulputate/elementum/nullam/varius.jpg?habitasse=eu&platea=sapien&dictumst=cursus&morbi=vestibulum&vestibulum=proin&velit=eu&id=mi&pretium=nulla&iaculis=ac&diam=enim&erat=in&fermentum=tempor&justo=turpis&nec=nec&condimentum=euismod&neque=scelerisque&sapien=quam&placerat=turpis&ante=adipiscing&nulla=lorem&justo=vitae&aliquam=mattis&quis=nibh&turpis=ligula&eget=nec&elit=sem&sodales=duis&scelerisque=aliquam&mauris=convallis&sit=nunc&amet=proin&eros=at&suspendisse=turpis&accumsan=a&tortor=pede&quis=posuere&turpis=nonummy&sed=integer&ante=non&vivamus=velit&tortor=donec&duis=diam&mattis=neque&egestas=vestibulum&metus=eget&aenean=vulputate&fermentum=ut&donec=ultrices&ut=vel&mauris=augue&eget=vestibulum&massa=ante&tempor=ipsum&convallis=primis&nulla=in&neque=faucibus&libero=orci&convallis=luctus&eget=et&eleifend=ultrices&luctus=posuere&ultricies=cubilia&eu=curae&nibh=donec&quisque=pharetra&id=magna&justo=vestibulum&sit=aliquet&amet=ultrices&sapien=erat&dignissim=tortor&vestibulum=sollicitudin&vestibulum=mi&ante=sit&ipsum=amet&primis=lobortis&in=sapien&faucibus=sapien&orci=non&luctus=mi"
}, {
  "author": "August Weaving",
  "reference": "http://statcounter.com/nulla/mollis.json?rhoncus=vestibulum&aliquam=ante&lacus=ipsum&morbi=primis&quis=in&tortor=faucibus&id=orci&nulla=luctus&ultrices=et&aliquet=ultrices&maecenas=posuere&leo=cubilia&odio=curae&condimentum=nulla&id=dapibus&luctus=dolor&nec=vel&molestie=est&sed=donec&justo=odio&pellentesque=justo&viverra=sollicitudin&pede=ut&ac=suscipit&diam=a&cras=feugiat&pellentesque=et&volutpat=eros&dui=vestibulum&maecenas=ac&tristique=est&est=lacinia&et=nisi&tempus=venenatis&semper=tristique&est=fusce&quam=congue&pharetra=diam&magna=id&ac=ornare&consequat=imperdiet&metus=sapien&sapien=urna&ut=pretium&nunc=nisl&vestibulum=ut&ante=volutpat&ipsum=sapien&primis=arcu&in=sed&faucibus=augue&orci=aliquam&luctus=erat&et=volutpat&ultrices=in&posuere=congue&cubilia=etiam&curae=justo&mauris=etiam&viverra=pretium&diam=iaculis&vitae=justo&quam=in&suspendisse=hac&potenti=habitasse&nullam=platea&porttitor=dictumst&lacus=etiam&at=faucibus&turpis=cursus&donec=urna&posuere=ut"
}, {
  "author": "Emelda Bedle",
  "reference": "https://unc.edu/ut/nulla/sed.jsp?purus=nulla&aliquet=nunc&at=purus&feugiat=phasellus&non=in&pretium=felis&quis=donec&lectus=semper&suspendisse=sapien&potenti=a&in=libero&eleifend=nam&quam=dui&a=proin&odio=leo&in=odio&hac=porttitor&habitasse=id&platea=consequat&dictumst=in&maecenas=consequat&ut=ut&massa=nulla&quis=sed&augue=accumsan&luctus=felis&tincidunt=ut&nulla=at&mollis=dolor&molestie=quis&lorem=odio&quisque=consequat&ut=varius&erat=integer&curabitur=ac&gravida=leo&nisi=pellentesque&at=ultrices&nibh=mattis&in=odio&hac=donec&habitasse=vitae&platea=nisi&dictumst=nam&aliquam=ultrices&augue=libero&quam=non&sollicitudin=mattis&vitae=pulvinar&consectetuer=nulla&eget=pede&rutrum=ullamcorper&at=augue&lorem=a&integer=suscipit&tincidunt=nulla&ante=elit&vel=ac&ipsum=nulla&praesent=sed&blandit=vel&lacinia=enim&erat=sit&vestibulum=amet&sed=nunc&magna=viverra&at=dapibus&nunc=nulla&commodo=suscipit&placerat=ligula&praesent=in&blandit=lacus&nam=curabitur&nulla=at&integer=ipsum"
}, {
  "author": "Ulberto Michell",
  "reference": "http://artisteer.com/duis/mattis/egestas/metus.png?tortor=dui&id=vel&nulla=sem&ultrices=sed&aliquet=sagittis&maecenas=nam&leo=congue&odio=risus&condimentum=semper&id=porta&luctus=volutpat&nec=quam&molestie=pede&sed=lobortis&justo=ligula&pellentesque=sit&viverra=amet&pede=eleifend&ac=pede&diam=libero&cras=quis&pellentesque=orci&volutpat=nullam&dui=molestie&maecenas=nibh&tristique=in&est=lectus&et=pellentesque&tempus=at&semper=nulla&est=suspendisse&quam=potenti&pharetra=cras&magna=in&ac=purus&consequat=eu&metus=magna&sapien=vulputate&ut=luctus&nunc=cum&vestibulum=sociis&ante=natoque&ipsum=penatibus&primis=et&in=magnis&faucibus=dis&orci=parturient&luctus=montes&et=nascetur&ultrices=ridiculus&posuere=mus&cubilia=vivamus&curae=vestibulum&mauris=sagittis&viverra=sapien&diam=cum&vitae=sociis&quam=natoque&suspendisse=penatibus&potenti=et&nullam=magnis&porttitor=dis"
}, {
  "author": "Marco Sopper",
  "reference": "http://domainmarket.com/lacus.aspx?vel=venenatis&augue=non&vestibulum=sodales&rutrum=sed&rutrum=tincidunt&neque=eu&aenean=felis&auctor=fusce&gravida=posuere&sem=felis&praesent=sed&id=lacus&massa=morbi&id=sem&nisl=mauris&venenatis=laoreet&lacinia=ut&aenean=rhoncus&sit=aliquet&amet=pulvinar&justo=sed&morbi=nisl&ut=nunc&odio=rhoncus&cras=dui&mi=vel&pede=sem&malesuada=sed&in=sagittis&imperdiet=nam&et=congue&commodo=risus&vulputate=semper&justo=porta&in=volutpat&blandit=quam&ultrices=pede&enim=lobortis&lorem=ligula&ipsum=sit&dolor=amet&sit=eleifend&amet=pede&consectetuer=libero&adipiscing=quis&elit=orci"
}, {
  "author": "Mickie Cockling",
  "reference": "http://pinterest.com/potenti/nullam.jsp?blandit=sapien&mi=arcu&in=sed&porttitor=augue&pede=aliquam&justo=erat&eu=volutpat&massa=in&donec=congue&dapibus=etiam&duis=justo&at=etiam&velit=pretium&eu=iaculis&est=justo&congue=in&elementum=hac&in=habitasse"
}, {
  "author": "Cammie Dutson",
  "reference": "http://wix.com/interdum.jsp?venenatis=arcu&turpis=adipiscing&enim=molestie&blandit=hendrerit&mi=at&in=vulputate&porttitor=vitae&pede=nisl&justo=aenean&eu=lectus&massa=pellentesque&donec=eget&dapibus=nunc&duis=donec&at=quis&velit=orci&eu=eget&est=orci&congue=vehicula&elementum=condimentum&in=curabitur&hac=in&habitasse=libero&platea=ut&dictumst=massa&morbi=volutpat&vestibulum=convallis&velit=morbi&id=odio&pretium=odio&iaculis=elementum&diam=eu&erat=interdum&fermentum=eu&justo=tincidunt&nec=in&condimentum=leo&neque=maecenas&sapien=pulvinar&placerat=lobortis&ante=est&nulla=phasellus&justo=sit&aliquam=amet&quis=erat&turpis=nulla&eget=tempus&elit=vivamus&sodales=in&scelerisque=felis&mauris=eu&sit=sapien&amet=cursus&eros=vestibulum&suspendisse=proin&accumsan=eu&tortor=mi&quis=nulla&turpis=ac&sed=enim"
}, {
  "author": "Cyrus Doolan",
  "reference": "https://intel.com/mus/etiam.jpg?libero=in&non=quam&mattis=fringilla&pulvinar=rhoncus&nulla=mauris&pede=enim&ullamcorper=leo&augue=rhoncus&a=sed&suscipit=vestibulum&nulla=sit&elit=amet&ac=cursus&nulla=id&sed=turpis&vel=integer&enim=aliquet&sit=massa&amet=id&nunc=lobortis&viverra=convallis&dapibus=tortor&nulla=risus&suscipit=dapibus&ligula=augue&in=vel&lacus=accumsan&curabitur=tellus&at=nisi&ipsum=eu&ac=orci&tellus=mauris&semper=lacinia&interdum=sapien&mauris=quis&ullamcorper=libero&purus=nullam&sit=sit&amet=amet&nulla=turpis&quisque=elementum&arcu=ligula&libero=vehicula&rutrum=consequat&ac=morbi&lobortis=a&vel=ipsum&dapibus=integer&at=a&diam=nibh&nam=in&tristique=quis"
}, {
  "author": "Adela Hanhard",
  "reference": "https://dailymotion.com/ut/nunc/vestibulum/ante/ipsum/primis/in.js?molestie=nulla&nibh=eget&in=eros&lectus=elementum&pellentesque=pellentesque&at=quisque&nulla=porta&suspendisse=volutpat&potenti=erat&cras=quisque&in=erat&purus=eros&eu=viverra&magna=eget&vulputate=congue&luctus=eget&cum=semper&sociis=rutrum&natoque=nulla&penatibus=nunc&et=purus&magnis=phasellus&dis=in&parturient=felis&montes=donec&nascetur=semper&ridiculus=sapien&mus=a&vivamus=libero&vestibulum=nam&sagittis=dui&sapien=proin&cum=leo&sociis=odio&natoque=porttitor&penatibus=id&et=consequat&magnis=in&dis=consequat&parturient=ut&montes=nulla&nascetur=sed&ridiculus=accumsan&mus=felis&etiam=ut&vel=at&augue=dolor&vestibulum=quis&rutrum=odio&rutrum=consequat&neque=varius&aenean=integer&auctor=ac&gravida=leo&sem=pellentesque&praesent=ultrices&id=mattis&massa=odio&id=donec"
}];

var tags = [
	'Drongo, fork-tailed',
	'Canadian river otter',
	'Bontebok',
	'Asian water buffalo',
	'Seal, southern elephant',
	'Ibex',
	'Common raccoon',
	'Blue and gold macaw',
	'Spoonbill, white',
	'Wombat, southern hairy-nosed',
	'Gull, herring',
	'African black crake',
	'Tiger cat',
	'Macaw, blue and yellow',
	'Mongoose, eastern dwarf',
	'Gull, lava',
	'Bleu, red-cheeked cordon',
	'Lapwing, southern',
	'Paca',
	'Four-striped grass mouse',
	'Jabiru stork',
	'Otter, small-clawed',
	'Indian jackal',
	'Cat, native',
	'Oriental short-clawed otter',
	'Palm squirrel',
	'Eastern quoll',
	'European shelduck',
	'Green-winged macaw',
	'Superb starling',
	'Rat, white-faced tree',
	'Koala',
	'Arctic tern',
	'Klipspringer',
	'Black-fronted bulbul',
	'Tern, arctic',
	'Oystercatcher, blackish',
	'Grenadier, common',
	'Rhesus macaque',
	'Serval',
	'Savanna baboon',
	'Crown of thorns starfish',
	'Agile wallaby',
	'Cape white-eye',
	'Common ringtail',
	'Dassie',
	'Robin, kalahari scrub',
	'Owl, burrowing',
	'Eastern diamondback rattlesnake',
	'Southern white-crowned shrike',
];

var categories = ['propuestas', 'actividades', 'herramientas', 'orientaciones', 'mediateca'];
var categoriesCaption = {
  'propuestas': 'Propuesta pedagógica',
  'actividades': 'Actividad accesible',
  'herramientas': 'Herramienta',
  'orientaciones': 'Orientación',
  'mediateca': 'Mediateca',
};
var levels = ['Inicial', 'Primaria Primer Ciclo', 'Primaria Segundo Ciclo', 'Primaria Tercer Ciclo', 'Centro de Formacion Integral', 'Todos'];
var fileTypes = ['Presentación', 'Video', 'Plantilla', 'Texto', 'Imágen', 'Audios'];

var area = ['Prácticas del lenguaje',
						'Matemática',
						'Inglés',
						'Ciencias Naturales',
						'Educación Artística',
						'Educación Física',
						'Construcción de la ciudadanía',
						'Palabras clave',
						'Ciencias Sociales',
						'Formación científico-tecnología',
						'Formación Técnico Específica',
						'Formación profesional u ocupacional',
						'Autonomía personal y social',
						'Otra'];

var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

var types = {};
types['herramientas'] = ['Rampas Digitales', 'Software para crear actividades', 'Software educativos'];
types['orientaciones'] = ['Tutoriales', 'Documentaciòn', 'Recomendaciones de uso de soft', 'Enlaces de interes', 'Documentación de apoyo'];
types['mediateca'] = ['Presentación', 'Video', 'Plantilla', 'Texto', 'Imágen', 'Audios'];

function random_(array){
	return array[_.random(0, (array.length-1))];
}

function randomSample_(array, n){
	if (!array) return [];

	if (n === undefined) {
		n = _.random(1, (array.length-1));
	}
	
	let res = [];

	for (var i = 0; i<n; i++)
		res.push(random_(array));

	return res;
}

function substr_(min, max){
	let n = _.random(min, max);
	if (n > lorem.length)
		n = lorem.length;
	return lorem.substr(0, n);
}

function files_(){
	let n = _.random(1, 5);
	let res = _.map(randomSample_(files, n), function(entry) {
		 return { 
			 entry: entry, 
			 length: _.random(1, 1024),
			 comment: substr_(0, 50)
			}
    });
    
  res.push({
    entry: 'http://lorempixel.com/400/200/',
    length: 0,
    comment: '$cover'
  });
  
  return res;
}

function tags_(){
	return _.words(random_(tags), /[^, ]+/g);
}

function randomDate_() {
  return new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
}

function create_(){

  let type_ = random_(categories);
  let uid = uuidv4();

  let cover = undefined;
  if (type_ === 'propuestas') {
    cover = 'http://lorempixel.com/400/200/?id=' + uid;
  }

  let levels_ = randomSample_(levels);

  if (type_ === 'mediateca'){
    levels_ = randomSample_(fileTypes);
  }

	return {
		uid: uid,
		version: 1,
    type: type_,
    typeCaption: categoriesCaption[type_],
    levels: levels_,
    areas: randomSample_(area),
    categories: randomSample_(types[type_]),
    title: random_(titles),
    cover: cover,
    thumbnail: 'http://lorempixel.com/100/100/?id=' + uid,
		summary: substr_(100, 200),
		remark: substr_(20, 100),
		tags: tags_(),
		sources: randomSample_(sources, 2),
		collaborators: randomSample_(collaborators, 3),
		// archivos
		files: files_(),
		// fecha de creación
		createdAt: randomDate_(),
		//fecha de actualización
		updatedAt: randomDate_()
	}
}

var items = [];

for (var i = 0; i < LIMIT; i++){
	items.push(create_())
}

module.exports = items;