/**
 * 
 * @param {string} fileNameOrExtension 
 * @param {'utf-8'|'utf-16'|"big5"|"euc-jp"|"euc-kr"|"gb2312"|"us-ascii"|"utf-7"} encoding
 */
export default async function getMIMEByFileName(fileNameOrExtension, encoding = undefined) {
  let extension, result;
  if (/^[^.]*\.(.+)/.test(fileNameOrExtension)) {
    extension = RegExp.$1
  }
  else {
    extension = fileNameOrExtension;
  }
  console.log(extension)
  switch (extension.toLowerCase()) {
    case 'ez':
      result = 'application/andrew-inset';
      break;
    case 'aw':
      result = 'application/applixware';
      break;
    case 'atomcat':
      result = 'application/atomcat+xml';
      break;
    case 'atom':
      result = 'application/atom+xml';
      break;
    case 'cdmia':
      result = 'application/cdmi-capability';
      break;
    case 'atomsvc':
      result = 'application/atomsvc+xml';
      break;
    case 'cdmic':
      result = 'application/cdmi-container';
      break;
    case 'ccxml':
      result = 'application/ccxml+xml';
      break;
    case 'cdmid':
      result = 'application/cdmi-domain';
      break;
    case 'cdmio':
      result = 'application/cdmi-object';
      break;
    case 'cdmiq':
      result = 'application/cdmi-queue';
      break;
    case 'davmount':
      result = 'application/davmount+xml';
      break;
    case 'cu':
      result = 'application/cu-seeme';
      break;
    case 'dbk':
      result = 'application/docbook+xml';
      break;
    case 'dssc':
      result = 'application/dssc+der';
      break;
    case 'ecma':
      result = 'application/ecmascript';
      break;
    case 'xdssc':
      result = 'application/dssc+xml';
      break;
    case 'epub':
      result = 'application/epub+zip';
      break;
    case 'pfr':
      result = 'application/font-tdpfr';
      break;
    case 'exi':
      result = 'application/exi';
      break;
    case 'emma':
      result = 'application/emma+xml';
      break;
    case 'gpx':
      result = 'application/gpx+xml';
      break;
    case 'gxf':
      result = 'application/gxf';
      break;
    case 'stk':
      result = 'application/hyperstudio';
      break;
    case 'ink':
    case 'inkml':
      result = 'application/inkml+xml';
      break;
    case 'gml':
      result = 'application/gml+xml';
      break;
    case 'jar':
      result = 'application/java-archive';
      break;
    case 'ser':
      result = 'application/java-serialized-object';
      break;
    case 'ipfix':
      result = 'application/ipfix';
      break;
    case 'class':
      result = 'application/java-vm';
      break;
    case 'jsonml':
      result = 'application/jsonml+json';
      break;
    case 'js':
      result = 'application/javascript';
      break;
    case 'lostxml':
      result = 'application/lost+xml';
      break;
    case 'cpt':
      result = 'application/mac-compactpro';
      break;
    case 'mads':
      result = 'application/mads+xml';
      break;
    case 'hqx':
      result = 'application/mac-binhex40';
      break;
    case 'mrcx':
      result = 'application/marcxml+xml';
      break;
    case 'mrc':
      result = 'application/marc';
      break;
    case 'json':
      result = 'application/json';
      break;
    case 'ma':
    case 'nb':
    case 'mb':
      result = 'application/mathematica';
      break;
    case 'mscml':
      result = 'application/mediaservercontrol+xml';
      break;
    case 'mathml':
      result = 'application/mathml+xml';
      break;
    case 'metalink':
      result = 'application/metalink+xml';
      break;
    case 'mets':
      result = 'application/mets+xml';
      break;
    case 'meta4':
      result = 'application/metalink4+xml';
      break;
    case 'm21':
    case 'mp21':
      result = 'application/mp21';
      break;
    case 'mods':
      result = 'application/mods+xml';
      break;
    case 'doc':
    case 'dot':
      result = 'application/msword';
      break;
    case 'mbox':
      result = 'application/mbox';
      break;
    case 'bin':
    case 'dms':
    case 'lrf':
    case 'mar':
    case 'so':
    case 'dist':
    case 'distz':
    case 'pkg':
    case 'bpk':
    case 'dump':
    case 'elc':
    case 'deploy':
      result = 'application/octet-stream';
      break;
    case 'mp4s':
      result = 'application/mp4';
      break;
    case 'opf':
      result = 'application/oebps-package+xml';
      break;
    case 'mxf':
      result = 'application/mxf';
      break;
    case 'ogx':
      result = 'application/ogg';
      break;
    case 'omdoc':
      result = 'application/omdoc+xml';
      break;
    case 'onetoc':
    case 'onetoc2':
    case 'onetmp':
    case 'onepkg':
      result = 'application/onenote';
      break;
    case 'oda':
      result = 'application/oda';
      break;
    case 'xer':
      result = 'application/patch-ops-error+xml';
      break;
    case 'oxps':
      result = 'application/oxps';
      break;
    case 'pgp':
      result = 'application/pgp-encrypted';
      break;
    case 'asc':
    case 'sig':
      result = 'application/pgp-signature';
      break;
    case 'pdf':
      result = 'application/pdf';
      break;
    case 'prf':
      result = 'application/pics-rules';
      break;
    case 'p7m':
    case 'p7c':
      result = 'application/pkcs7-mime';
      break;
    case 'p8':
      result = 'application/pkcs8';
      break;
    case 'p7s':
      result = 'application/pkcs7-signature';
      break;
    case 'cer':
      result = 'application/pkix-cert';
      break;
    case 'p10':
      result = 'application/pkcs10';
      break;
    case 'ac':
      result = 'application/pkix-attr-cert';
      break;
    case 'pkipath':
      result = 'application/pkix-pkipath';
      break;
    case 'pls':
      result = 'application/pls+xml';
      break;
    case 'pki':
      result = 'application/pkixcmp';
      break;
    case 'crl':
      result = 'application/pkix-crl';
      break;
    case 'pskcxml':
      result = 'application/pskc+xml';
      break;
    case 'ai':
    case 'eps':
    case 'ps':
      result = 'application/postscript';
      break;
    case 'cww':
      result = 'application/prs.cww';
      break;
    case 'rif':
      result = 'application/reginfo+xml';
      break;
    case 'rnc':
      result = 'application/relax-ng-compact-syntax';
      break;
    case 'rld':
      result = 'application/resource-lists-diff+xml';
      break;
    case 'rl':
      result = 'application/resource-lists+xml';
      break;
    case 'rs':
      result = 'application/rls-services+xml';
      break;
    case 'gbr':
      result = 'application/rpki-ghostbusters';
      break;
    case 'rdf':
      result = 'application/rdf+xml';
      break;
    case 'mft':
      result = 'application/rpki-manifest';
      break;
    case 'rss':
      result = 'application/rss+xml';
      break;
    case 'roa':
      result = 'application/rpki-roa';
      break;
    case 'rtf':
      result = 'application/rtf';
      break;
    case 'sbml':
      result = 'application/sbml+xml';
      break;
    case 'scq':
      result = 'application/scvp-cv-request';
      break;
    case 'spq':
      result = 'application/scvp-vp-request';
      break;
    case 'scs':
      result = 'application/scvp-cv-response';
      break;
    case 'spp':
      result = 'application/scvp-vp-response';
      break;
    case 'rsd':
      result = 'application/rsd+xml';
      break;
    case 'setpay':
      result = 'application/set-payment-initiation';
      break;
    case 'setreg':
      result = 'application/set-registration-initiation';
      break;
    case 'smi':
    case 'smil':
      result = 'application/smil+xml';
      break;
    case 'sdp':
      result = 'application/sdp';
      break;
    case 'shf':
      result = 'application/shf+xml';
      break;
    case 'srx':
      result = 'application/sparql-results+xml';
      break;
    case 'gram':
      result = 'application/srgs';
      break;
    case 'rq':
      result = 'application/sparql-query';
      break;
    case 'ssdl':
      result = 'application/ssdl+xml';
      break;
    case 'grxml':
      result = 'application/srgs+xml';
      break;
    case 'tei':
    case 'teicorpus':
      result = 'application/tei+xml';
      break;
    case 'sru':
      result = 'application/sru+xml';
      break;
    case 'ssml':
      result = 'application/ssml+xml';
      break;
    case 'tfi':
      result = 'application/thraud+xml';
      break;
    case 'psb':
      result = 'application/vnd.3gpp.pic-bw-small';
      break;
    case 'plb':
      result = 'application/vnd.3gpp.pic-bw-large';
      break;
    case 'tsd':
      result = 'application/timestamped-data';
      break;
    case 'pvb':
      result = 'application/vnd.3gpp.pic-bw-var';
      break;
    case 'pwn':
      result = 'application/vnd.3m.post-it-notes';
      break;
    case 'aso':
      result = 'application/vnd.accpac.simply.aso';
      break;
    case 'imp':
      result = 'application/vnd.accpac.simply.imp';
      break;
    case 'acu':
      result = 'application/vnd.acucobol';
      break;
    case 'atc':
    case 'acutc':
      result = 'application/vnd.acucorp';
      break;
    case 'air':
      result = 'application/vnd.adobe.air-application-installer-package+zip';
      break;
    case 'fxp':
    case 'fxpl':
      result = 'application/vnd.adobe.fxp';
      break;
    case 'fcdt':
      result = 'application/vnd.adobe.formscentral.fcdt';
      break;
    case 'xfdf':
      result = 'application/vnd.adobe.xfdf';
      break;
    case 'tcap':
      result = 'application/vnd.3gpp2.tcap';
      break;
    case 'xdp':
      result = 'application/vnd.adobe.xdp+xml';
      break;
    case 'azf':
      result = 'application/vnd.airzip.filesecure.azf';
      break;
    case 'azw':
      result = 'application/vnd.amazon.ebook';
      break;
    case 'ahead':
      result = 'application/vnd.ahead.space';
      break;
    case 'azs':
      result = 'application/vnd.airzip.filesecure.azs';
      break;
    case 'apk':
      result = 'application/vnd.android.package-archive';
      break;
    case 'cii':
      result = 'application/vnd.anser-web-certificate-issue-initiation';
      break;
    case 'acc':
      result = 'application/vnd.americandynamics.acc';
      break;
    case 'fti':
      result = 'application/vnd.anser-web-funds-transfer-initiation';
      break;
    case 'atx':
      result = 'application/vnd.antix.game-component';
      break;
    case 'ami':
      result = 'application/vnd.amiga.ami';
      break;
    case 'm3u8':
      result = 'application/vnd.apple.mpegurl';
      break;
    case 'swi':
      result = 'application/vnd.aristanetworks.swi';
      break;
    case 'iota':
      result = 'application/vnd.astraea-software.iota';
      break;
    case 'mpm':
      result = 'application/vnd.blueice.multipass';
      break;
    case 'mpkg':
      result = 'application/vnd.apple.installer+xml';
      break;
    case 'aep':
      result = 'application/vnd.audiograph';
      break;
    case 'rep':
      result = 'application/vnd.businessobjects';
      break;
    case 'mmd':
      result = 'application/vnd.chipnuts.karaoke-mmd';
      break;
    case 'cdy':
      result = 'application/vnd.cinderella';
      break;
    case 'cdxml':
      result = 'application/vnd.chemdraw+xml';
      break;
    case 'rp9':
      result = 'application/vnd.cloanto.rp9';
      break;
    case 'cla':
      result = 'application/vnd.claymore';
      break;
    case 'c4g':
    case 'c4d':
    case 'c4f':
    case 'c4p':
    case 'c4u':
      result = 'application/vnd.clonk.c4group';
      break;
    case 'c11amc':
      result = 'application/vnd.cluetrust.cartomobile-config';
      break;
    case 'c11amz':
      result = 'application/vnd.cluetrust.cartomobile-config-pkg';
      break;
    case 'csp':
      result = 'application/vnd.commonspace';
      break;
    case 'cdbcmsg':
      result = 'application/vnd.contact.cmsg';
      break;
    case 'clkx':
      result = 'application/vnd.crick.clicker';
      break;
    case 'cmc':
      result = 'application/vnd.cosmocaller';
      break;
    case 'clkk':
      result = 'application/vnd.crick.clicker.keyboard';
      break;
    case 'clkt':
      result = 'application/vnd.crick.clicker.template';
      break;
    case 'bmi':
      result = 'application/vnd.bmi';
      break;
    case 'clkp':
      result = 'application/vnd.crick.clicker.palette';
      break;
    case 'pml':
      result = 'application/vnd.ctc-posml';
      break;
    case 'wbs':
      result = 'application/vnd.criticaltools.wbs+xml';
      break;
    case 'clkw':
      result = 'application/vnd.crick.clicker.wordbank';
      break;
    case 'car':
      result = 'application/vnd.curl.car';
      break;
    case 'pcurl':
      result = 'application/vnd.curl.pcurl';
      break;
    case 'dart':
      result = 'application/vnd.dart';
      break;
    case 'rdz':
      result = 'application/vnd.data-vision.rdz';
      break;
    case 'uvf':
    case 'uvvf':
    case 'uvd':
    case 'uvvd':
      result = 'application/vnd.dece.data';
      break;
    case 'uvx':
    case 'uvvx':
      result = 'application/vnd.dece.unspecified';
      break;
    case 'uvz':
    case 'uvvz':
      result = 'application/vnd.dece.zip';
      break;
    case 'uvt':
    case 'uvvt':
      result = 'application/vnd.dece.ttml+xml';
      break;
    case 'fe_launch':
      result = 'application/vnd.denovo.fcselayout-link';
      break;
    case 'dna':
      result = 'application/vnd.dna';
      break;
    case 'ppd':
      result = 'application/vnd.cups-ppd';
      break;
    case 'dfac':
      result = 'application/vnd.dreamfactory';
      break;
    case 'dpg':
      result = 'application/vnd.dpgraph';
      break;
    case 'kpxx':
      result = 'application/vnd.ds-keypoint';
      break;
    case 'mlp':
      result = 'application/vnd.dolby.mlp';
      break;
    case 'svc':
      result = 'application/vnd.dvb.service';
      break;
    case 'geo':
      result = 'application/vnd.dynageo';
      break;
    case 'mag':
      result = 'application/vnd.ecowin.chart';
      break;
    case 'esf':
      result = 'application/vnd.epson.esf';
      break;
    case 'nml':
      result = 'application/vnd.enliven';
      break;
    case 'msf':
      result = 'application/vnd.epson.msf';
      break;
    case 'qam':
      result = 'application/vnd.epson.quickanime';
      break;
    case 'slt':
      result = 'application/vnd.epson.salt';
      break;
    case 'es3':
    case 'et3':
      result = 'application/vnd.eszigno3+xml';
      break;
    case 'ez2':
      result = 'application/vnd.ezpix-album';
      break;
    case 'ait':
      result = 'application/vnd.dvb.ait';
      break;
    case 'ssf':
      result = 'application/vnd.epson.ssf';
      break;
    case 'mseed':
      result = 'application/vnd.fdsn.mseed';
      break;
    case 'ez3':
      result = 'application/vnd.ezpix-package';
      break;
    case 'seed':
    case 'dataless':
      result = 'application/vnd.fdsn.seed';
      break;
    case 'gph':
      result = 'application/vnd.flographit';
      break;
    case 'ftc':
      result = 'application/vnd.fluxtime.clip';
      break;
    case 'fm':
    case 'frame':
    case 'maker':
    case 'book':
      result = 'application/vnd.framemaker';
      break;
    case 'ltf':
      result = 'application/vnd.frogans.ltf';
      break;
    case 'fdf':
      result = 'application/vnd.fdf';
      break;
    case 'fnc':
      result = 'application/vnd.frogans.fnc';
      break;
    case 'fsc':
      result = 'application/vnd.fsc.weblaunch';
      break;
    case 'oa2':
      result = 'application/vnd.fujitsu.oasys2';
      break;
    case 'fg5':
      result = 'application/vnd.fujitsu.oasysgp';
      break;
    case 'oas':
      result = 'application/vnd.fujitsu.oasys';
      break;
    case 'bh2':
      result = 'application/vnd.fujitsu.oasysprs';
      break;
    case 'ddd':
      result = 'application/vnd.fujixerox.ddd';
      break;
    case 'xdw':
      result = 'application/vnd.fujixerox.docuworks';
      break;
    case 'xbd':
      result = 'application/vnd.fujixerox.docuworks.binder';
      break;
    case 'fzs':
      result = 'application/vnd.fuzzysheet';
      break;
    case 'txd':
      result = 'application/vnd.genomatix.tuxedo';
      break;
    case 'ggt':
      result = 'application/vnd.geogebra.tool';
      break;
    case 'oa3':
      result = 'application/vnd.fujitsu.oasys3';
      break;
    case 'gex':
    case 'gre':
      result = 'application/vnd.geometry-explorer';
      break;
    case 'ggb':
      result = 'application/vnd.geogebra.file';
      break;
    case 'gxt':
      result = 'application/vnd.geonext';
      break;
    case 'g3w':
      result = 'application/vnd.geospace';
      break;
    case 'kml':
      result = 'application/vnd.google-earth.kml+xml';
      break;
    case 'gmx':
      result = 'application/vnd.gmx';
      break;
    case 'kmz':
      result = 'application/vnd.google-earth.kmz';
      break;
    case 'gqf':
    case 'gqs':
      result = 'application/vnd.grafeq';
      break;
    case 'gac':
      result = 'application/vnd.groove-account';
      break;
    case 'ghf':
      result = 'application/vnd.groove-help';
      break;
    case 'g2w':
      result = 'application/vnd.geoplan';
      break;
    case 'gim':
      result = 'application/vnd.groove-identity-message';
      break;
    case 'grv':
      result = 'application/vnd.groove-injector';
      break;
    case 'gtm':
      result = 'application/vnd.groove-tool-message';
      break;
    case 'tpl':
      result = 'application/vnd.groove-tool-template';
      break;
    case 'zmm':
      result = 'application/vnd.handheld-entertainment+xml';
      break;
    case 'hal':
      result = 'application/vnd.hal+xml';
      break;
    case 'vcg':
      result = 'application/vnd.groove-vcard';
      break;
    case 'les':
      result = 'application/vnd.hhe.lesson-player';
      break;
    case 'hpgl':
      result = 'application/vnd.hp-hpgl';
      break;
    case 'hps':
      result = 'application/vnd.hp-hps';
      break;
    case 'hpid':
      result = 'application/vnd.hp-hpid';
      break;
    case 'hbci':
      result = 'application/vnd.hbci';
      break;
    case 'pcl':
      result = 'application/vnd.hp-pcl';
      break;
    case 'sfd-hdstx':
      result = 'application/vnd.hydrostatix.sof-data';
      break;
    case 'pclxl':
      result = 'application/vnd.hp-pclxl';
      break;
    case 'mpy':
      result = 'application/vnd.ibm.minipay';
      break;
    case 'afp':
    case 'listafp':
    case 'list3820':
      result = 'application/vnd.ibm.modcap';
      break;
    case 'jlt':
      result = 'application/vnd.hp-jlyt';
      break;
    case 'irm':
      result = 'application/vnd.ibm.rights-management';
      break;
    case 'icc':
    case 'icm':
      result = 'application/vnd.iccprofile';
      break;
    case 'igl':
      result = 'application/vnd.igloader';
      break;
    case 'ivp':
      result = 'application/vnd.immervision-ivp';
      break;
    case 'sc':
      result = 'application/vnd.ibm.secure-container';
      break;
    case 'ivu':
      result = 'application/vnd.immervision-ivu';
      break;
    case 'xpw':
    case 'xpx':
      result = 'application/vnd.intercon.formnet';
      break;
    case 'qbo':
      result = 'application/vnd.intu.qbo';
      break;
    case 'igm':
      result = 'application/vnd.insors.igm';
      break;
    case 'rcprofile':
      result = 'application/vnd.ipunplugged.rcprofile';
      break;
    case 'qfx':
      result = 'application/vnd.intu.qfx';
      break;
    case 'i2g':
      result = 'application/vnd.intergeo';
      break;
    case 'irp':
      result = 'application/vnd.irepository.package+xml';
      break;
    case 'xpr':
      result = 'application/vnd.is-xpr';
      break;
    case 'fcs':
      result = 'application/vnd.isac.fcs';
      break;
    case 'rms':
      result = 'application/vnd.jcp.javame.midlet-rms';
      break;
    case 'jam':
      result = 'application/vnd.jam';
      break;
    case 'jisp':
      result = 'application/vnd.jisp';
      break;
    case 'joda':
      result = 'application/vnd.joost.joda-archive';
      break;
    case 'ktz':
    case 'ktr':
      result = 'application/vnd.kahootz';
      break;
    case 'kfo':
      result = 'application/vnd.kde.kformula';
      break;
    case 'karbon':
      result = 'application/vnd.kde.karbon';
      break;
    case 'flw':
      result = 'application/vnd.kde.kivio';
      break;
    case 'kon':
      result = 'application/vnd.kde.kontour';
      break;
    case 'chrt':
      result = 'application/vnd.kde.kchart';
      break;
    case 'kpr':
    case 'kpt':
      result = 'application/vnd.kde.kpresenter';
      break;
    case 'ksp':
      result = 'application/vnd.kde.kspread';
      break;
    case 'kwd':
    case 'kwt':
      result = 'application/vnd.kde.kword';
      break;
    case 'kne':
    case 'knp':
      result = 'application/vnd.kinar';
      break;
    case 'kia':
      result = 'application/vnd.kidspiration';
      break;
    case 'skp':
    case 'skd':
    case 'skt':
    case 'skm':
      result = 'application/vnd.koan';
      break;
    case 'htke':
      result = 'application/vnd.kenameaapp';
      break;
    case 'sse':
      result = 'application/vnd.kodak-descriptor';
      break;
    case 'lbd':
      result = 'application/vnd.llamagraphics.life-balance.desktop';
      break;
    case 'lbe':
      result = 'application/vnd.llamagraphics.life-balance.exchange+xml';
      break;
    case '123':
      result = 'application/vnd.lotus-1-2-3';
      break;
    case 'lasxml':
      result = 'application/vnd.las.las+xml';
      break;
    case 'apr':
      result = 'application/vnd.lotus-approach';
      break;
    case 'pre':
      result = 'application/vnd.lotus-freelance';
      break;
    case 'org':
      result = 'application/vnd.lotus-organizer';
      break;
    case 'lwp':
      result = 'application/vnd.lotus-wordpro';
      break;
    case 'nsf':
      result = 'application/vnd.lotus-notes';
      break;
    case 'scm':
      result = 'application/vnd.lotus-screencam';
      break;
    case 'mc1':
      result = 'application/vnd.medcalcdata';
      break;
    case 'portpkg':
      result = 'application/vnd.macports.portpkg';
      break;
    case 'mcd':
      result = 'application/vnd.mcd';
      break;
    case 'cdkey':
      result = 'application/vnd.mediastation.cdkey';
      break;
    case 'mwf':
      result = 'application/vnd.mfer';
      break;
    case 'flo':
      result = 'application/vnd.micrografx.flo';
      break;
    case 'mfm':
      result = 'application/vnd.mfmp';
      break;
    case 'mif':
      result = 'application/vnd.mif';
      break;
    case 'daf':
      result = 'application/vnd.mobius.daf';
      break;
    case 'igx':
      result = 'application/vnd.micrografx.igx';
      break;
    case 'dis':
      result = 'application/vnd.mobius.dis';
      break;
    case 'msl':
      result = 'application/vnd.mobius.msl';
      break;
    case 'plc':
      result = 'application/vnd.mobius.plc';
      break;
    case 'mbk':
      result = 'application/vnd.mobius.mbk';
      break;
    case 'mqy':
      result = 'application/vnd.mobius.mqy';
      break;
    case 'mpn':
      result = 'application/vnd.mophun.application';
      break;
    case 'mpc':
      result = 'application/vnd.mophun.certificate';
      break;
    case 'txf':
      result = 'application/vnd.mobius.txf';
      break;
    case 'cil':
      result = 'application/vnd.ms-artgalry';
      break;
    case 'xul':
      result = 'application/vnd.mozilla.xul+xml';
      break;
    case 'xlam':
      result = 'application/vnd.ms-excel.addin.macroenabled.12';
      break;
    case 'xls':
    case 'xlm':
    case 'xla':
    case 'xlc':
    case 'xlt':
    case 'xlw':
      result = 'application/vnd.ms-excel';
      break;
    case 'xlsm':
      result = 'application/vnd.ms-excel.sheet.macroenabled.12';
      break;
    case 'xlsb':
      result = 'application/vnd.ms-excel.sheet.binary.macroenabled.12';
      break;
    case 'xltm':
      result = 'application/vnd.ms-excel.template.macroenabled.12';
      break;
    case 'chm':
      result = 'application/vnd.ms-htmlhelp';
      break;
    case 'cab':
      result = 'application/vnd.ms-cab-compressed';
      break;
    case 'ims':
      result = 'application/vnd.ms-ims';
      break;
    case 'eot':
      result = 'application/vnd.ms-fontobject';
      break;
    case 'thmx':
      result = 'application/vnd.ms-officetheme';
      break;
    case 'stl':
      result = 'application/vnd.ms-pki.stl';
      break;
    case 'lrm':
      result = 'application/vnd.ms-lrm';
      break;
    case 'cat':
      result = 'application/vnd.ms-pki.seccat';
      break;
    case 'ppam':
      result = 'application/vnd.ms-powerpoint.addin.macroenabled.12';
      break;
    case 'ppt':
    case 'pps':
    case 'pot':
      result = 'application/vnd.ms-powerpoint';
      break;
    case 'pptm':
      result = 'application/vnd.ms-powerpoint.presentation.macroenabled.12';
      break;
    case 'potm':
      result = 'application/vnd.ms-powerpoint.template.macroenabled.12';
      break;
    case 'ppsm':
      result = 'application/vnd.ms-powerpoint.slideshow.macroenabled.12';
      break;
    case 'sldm':
      result = 'application/vnd.ms-powerpoint.slide.macroenabled.12';
      break;
    case 'mpp':
    case 'mpt':
      result = 'application/vnd.ms-project';
      break;
    case 'docm':
      result = 'application/vnd.ms-word.document.macroenabled.12';
      break;
    case 'wps':
    case 'wks':
    case 'wcm':
    case 'wdb':
      result = 'application/vnd.ms-works';
      break;
    case 'wpl':
      result = 'application/vnd.ms-wpl';
      break;
    case 'xps':
      result = 'application/vnd.ms-xpsdocument';
      break;
    case 'dotm':
      result = 'application/vnd.ms-word.template.macroenabled.12';
      break;
    case 'mus':
      result = 'application/vnd.musician';
      break;
    case 'msty':
      result = 'application/vnd.muvee.style';
      break;
    case 'nlu':
      result = 'application/vnd.neurolanguage.nlu';
      break;
    case 'mseq':
      result = 'application/vnd.mseq';
      break;
    case 'ntf':
    case 'nitf':
      result = 'application/vnd.nitf';
      break;
    case 'nnd':
      result = 'application/vnd.noblenet-directory';
      break;
    case 'nns':
      result = 'application/vnd.noblenet-sealer';
      break;
    case 'taglet':
      result = 'application/vnd.mynfc';
      break;
    case 'ngdat':
      result = 'application/vnd.nokia.n-gage.data';
      break;
    case 'n-gage':
      result = 'application/vnd.nokia.n-gage.symbian.install';
      break;
    case 'rpss':
      result = 'application/vnd.nokia.radio-presets';
      break;
    case 'rpst':
      result = 'application/vnd.nokia.radio-preset';
      break;
    case 'edx':
      result = 'application/vnd.novadigm.edx';
      break;
    case 'edm':
      result = 'application/vnd.novadigm.edm';
      break;
    case 'nnw':
      result = 'application/vnd.noblenet-web';
      break;
    case 'odc':
      result = 'application/vnd.oasis.opendocument.chart';
      break;
    case 'otc':
      result = 'application/vnd.oasis.opendocument.chart-template';
      break;
    case 'odb':
      result = 'application/vnd.oasis.opendocument.database';
      break;
    case 'odft':
      result = 'application/vnd.oasis.opendocument.formula-template';
      break;
    case 'ext':
      result = 'application/vnd.novadigm.ext';
      break;
    case 'otg':
      result = 'application/vnd.oasis.opendocument.graphics-template';
      break;
    case 'odg':
      result = 'application/vnd.oasis.opendocument.graphics';
      break;
    case 'oti':
      result = 'application/vnd.oasis.opendocument.image-template';
      break;
    case 'odf':
      result = 'application/vnd.oasis.opendocument.formula';
      break;
    case 'odp':
      result = 'application/vnd.oasis.opendocument.presentation';
      break;
    case 'ods':
      result = 'application/vnd.oasis.opendocument.spreadsheet';
      break;
    case 'otp':
      result = 'application/vnd.oasis.opendocument.presentation-template';
      break;
    case 'ots':
      result = 'application/vnd.oasis.opendocument.spreadsheet-template';
      break;
    case 'odt':
      result = 'application/vnd.oasis.opendocument.text';
      break;
    case 'odm':
      result = 'application/vnd.oasis.opendocument.text-master';
      break;
    case 'ott':
      result = 'application/vnd.oasis.opendocument.text-template';
      break;
    case 'odi':
      result = 'application/vnd.oasis.opendocument.image';
      break;
    case 'oth':
      result = 'application/vnd.oasis.opendocument.text-web';
      break;
    case 'dd2':
      result = 'application/vnd.oma.dd2+xml';
      break;
    case 'oxt':
      result = 'application/vnd.openofficeorg.extension';
      break;
    case 'sldx':
      result = 'application/vnd.openxmlformats-officedocument.presentationml.slide';
      break;
    case 'ppsx':
      result = 'application/vnd.openxmlformats-officedocument.presentationml.slideshow';
      break;
    case 'potx':
      result = 'application/vnd.openxmlformats-officedocument.presentationml.template';
      break;
    case 'xo':
      result = 'application/vnd.olpc-sugar';
      break;
    case 'xlsx':
      result = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    case 'docx':
      result = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;
    case 'dotx':
      result = 'application/vnd.openxmlformats-officedocument.wordprocessingml.template';
      break;
    case 'pptx':
      result = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      break;
    case 'xltx':
      result = 'application/vnd.openxmlformats-officedocument.spreadsheetml.template';
      break;
    case 'dp':
      result = 'application/vnd.osgi.dp';
      break;
    case 'mgp':
      result = 'application/vnd.osgeo.mapguide.package';
      break;
    case 'pdb':
    case 'pqa':
    case 'oprc':
      result = 'application/vnd.palm';
      break;
    case 'str':
      result = 'application/vnd.pg.format';
      break;
    case 'paw':
      result = 'application/vnd.pawaafile';
      break;
    case 'ei6':
      result = 'application/vnd.pg.osasli';
      break;
    case 'wg':
      result = 'application/vnd.pmi.widget';
      break;
    case 'efif':
      result = 'application/vnd.picsel';
      break;
    case 'plf':
      result = 'application/vnd.pocketlearn';
      break;
    case 'box':
      result = 'application/vnd.previewsystems.box';
      break;
    case 'esa':
      result = 'application/vnd.osgi.subsystem';
      break;
    case 'mgz':
      result = 'application/vnd.proteus.magazine';
      break;
    case 'qps':
      result = 'application/vnd.publishare-delta-tree';
      break;
    case 'qxd':
    case 'qxt':
    case 'qwd':
    case 'qwt':
    case 'qxl':
    case 'qxb':
      result = 'application/vnd.quark.quarkxpress';
      break;
    case 'bed':
      result = 'application/vnd.realvnc.bed';
      break;
    case 'ptid':
      result = 'application/vnd.pvi.ptid1';
      break;
    case 'mxl':
      result = 'application/vnd.recordare.musicxml';
      break;
    case 'cryptonote':
      result = 'application/vnd.rig.cryptonote';
      break;
    case 'musicxml':
      result = 'application/vnd.recordare.musicxml+xml';
      break;
    case 'rm':
      result = 'application/vnd.rn-realmedia';
      break;
    case 'rmvb':
      result = 'application/vnd.rn-realmedia-vbr';
      break;
    case 'link66':
      result = 'application/vnd.route66.link66+xml';
      break;
    case 'cod':
      result = 'application/vnd.rim.cod';
      break;
    case 'st':
      result = 'application/vnd.sailingtracker.track';
      break;
    case 'pbd':
      result = 'application/vnd.powerbuilder6';
      break;
    case 'see':
      result = 'application/vnd.seemail';
      break;
    case 'semd':
      result = 'application/vnd.semd';
      break;
    case 'ifm':
      result = 'application/vnd.shana.informed.formdata';
      break;
    case 'semf':
      result = 'application/vnd.semf';
      break;
    case 'iif':
      result = 'application/vnd.shana.informed.interchange';
      break;
    case 'ipk':
      result = 'application/vnd.shana.informed.package';
      break;
    case 'itp':
      result = 'application/vnd.shana.informed.formtemplate';
      break;
    case 'twd':
    case 'twds':
      result = 'application/vnd.simtech-mindmapper';
      break;
    case 'mmf':
      result = 'application/vnd.smaf';
      break;
    case 'teacher':
      result = 'application/vnd.smart.teacher';
      break;
    case 'sdkm':
    case 'sdkd':
      result = 'application/vnd.solent.sdkm+xml';
      break;
    case 'sema':
      result = 'application/vnd.sema';
      break;
    case 'dxp':
      result = 'application/vnd.spotfire.dxp';
      break;
    case 'sda':
      result = 'application/vnd.stardivision.draw';
      break;
    case 'sdd':
      result = 'application/vnd.stardivision.impress';
      break;
    case 'smf':
      result = 'application/vnd.stardivision.math';
      break;
    case 'sdw':
    case 'vor':
      result = 'application/vnd.stardivision.writer';
      break;
    case 'sdc':
      result = 'application/vnd.stardivision.calc';
      break;
    case 'sgl':
      result = 'application/vnd.stardivision.writer-global';
      break;
    case 'sm':
      result = 'application/vnd.stepmania.stepchart';
      break;
    case 'smzip':
      result = 'application/vnd.stepmania.package';
      break;
    case 'stc':
      result = 'application/vnd.sun.xml.calc.template';
      break;
    case 'sxc':
      result = 'application/vnd.sun.xml.calc';
      break;
    case 'sfs':
      result = 'application/vnd.spotfire.sfs';
      break;
    case 'std':
      result = 'application/vnd.sun.xml.draw.template';
      break;
    case 'sti':
      result = 'application/vnd.sun.xml.impress.template';
      break;
    case 'sxm':
      result = 'application/vnd.sun.xml.math';
      break;
    case 'sxi':
      result = 'application/vnd.sun.xml.impress';
      break;
    case 'sxg':
      result = 'application/vnd.sun.xml.writer.global';
      break;
    case 'sxw':
      result = 'application/vnd.sun.xml.writer';
      break;
    case 'stw':
      result = 'application/vnd.sun.xml.writer.template';
      break;
    case 'sus':
    case 'susp':
      result = 'application/vnd.sus-calendar';
      break;
    case 'sis':
    case 'sisx':
      result = 'application/vnd.symbian.install';
      break;
    case 'xsm':
      result = 'application/vnd.syncml+xml';
      break;
    case 'sxd':
      result = 'application/vnd.sun.xml.draw';
      break;
    case 'bdm':
      result = 'application/vnd.syncml.dm+wbxml';
      break;
    case 'tao':
      result = 'application/vnd.tao.intent-module-archive';
      break;
    case 'svd':
      result = 'application/vnd.svd';
      break;
    case 'pcap':
    case 'cap':
    case 'dmp':
      result = 'application/vnd.tcpdump.pcap';
      break;
    case 'tmo':
      result = 'application/vnd.tmobile-livetv';
      break;
    case 'mxs':
      result = 'application/vnd.triscape.mxs';
      break;
    case 'xdm':
      result = 'application/vnd.syncml.dm+xml';
      break;
    case 'ufd':
    case 'ufdl':
      result = 'application/vnd.ufdl';
      break;
    case 'tpt':
      result = 'application/vnd.trid.tpt';
      break;
    case 'utz':
      result = 'application/vnd.uiq.theme';
      break;
    case 'unityweb':
      result = 'application/vnd.unity';
      break;
    case 'tra':
      result = 'application/vnd.trueapp';
      break;
    case 'uoml':
      result = 'application/vnd.uoml+xml';
      break;
    case 'vsd':
    case 'vst':
    case 'vss':
    case 'vsw':
      result = 'application/vnd.visio';
      break;
    case 'vis':
      result = 'application/vnd.visionary';
      break;
    case 'vcx':
      result = 'application/vnd.vcx';
      break;
    case 'wbxml':
      result = 'application/vnd.wap.wbxml';
      break;
    case 'wmlc':
      result = 'application/vnd.wap.wmlc';
      break;
    case 'vsf':
      result = 'application/vnd.vsf';
      break;
    case 'wmlsc':
      result = 'application/vnd.wap.wmlscriptc';
      break;
    case 'umj':
      result = 'application/vnd.umajin';
      break;
    case 'nbp':
      result = 'application/vnd.wolfram.player';
      break;
    case 'wqd':
      result = 'application/vnd.wqd';
      break;
    case 'wpd':
      result = 'application/vnd.wordperfect';
      break;
    case 'wtb':
      result = 'application/vnd.webturbo';
      break;
    case 'xfdl':
      result = 'application/vnd.xfdl';
      break;
    case 'stf':
      result = 'application/vnd.wt.stf';
      break;
    case 'hvd':
      result = 'application/vnd.yamaha.hv-dic';
      break;
    case 'hvp':
      result = 'application/vnd.yamaha.hv-voice';
      break;
    case 'hvs':
      result = 'application/vnd.yamaha.hv-script';
      break;
    case 'osf':
      result = 'application/vnd.yamaha.openscoreformat';
      break;
    case 'osfpvg':
      result = 'application/vnd.yamaha.openscoreformat.osfpvg+xml';
      break;
    case 'spf':
      result = 'application/vnd.yamaha.smaf-phrase';
      break;
    case 'xar':
      result = 'application/vnd.xara';
      break;
    case 'saf':
      result = 'application/vnd.yamaha.smaf-audio';
      break;
    case 'zaz':
      result = 'application/vnd.zzazz.deck+xml';
      break;
    case 'cmp':
      result = 'application/vnd.yellowriver-custom-menu';
      break;
    case 'vxml':
      result = 'application/voicexml+xml';
      break;
    case 'zir':
    case 'zirz':
      result = 'application/vnd.zul';
      break;
    case 'wsdl':
      result = 'application/wsdl+xml';
      break;
    case 'hlp':
      result = 'application/winhlp';
      break;
    case 'wspolicy':
      result = 'application/wspolicy+xml';
      break;
    case 'abw':
      result = 'application/x-abiword';
      break;
    case '7z':
      result = 'application/x-7z-compressed';
      break;
    case 'wgt':
      result = 'application/widget';
      break;
    case 'dmg':
      result = 'application/x-apple-diskimage';
      break;
    case 'aab':
    case 'x32':
    case 'u32':
    case 'vox':
      result = 'application/x-authorware-bin';
      break;
    case 'ace':
      result = 'application/x-ace-compressed';
      break;
    case 'bcpio':
      result = 'application/x-bcpio';
      break;
    case 'aas':
      result = 'application/x-authorware-seg';
      break;
    case 'blb':
    case 'blorb':
      result = 'application/x-blorb';
      break;
    case 'bz':
      result = 'application/x-bzip';
      break;
    case 'bz2':
    case 'boz':
      result = 'application/x-bzip2';
      break;
    case 'cbr':
    case 'cba':
    case 'cbt':
    case 'cbz':
    case 'cb7':
      result = 'application/x-cbr';
      break;
    case 'aam':
      result = 'application/x-authorware-map';
      break;
    case 'torrent':
      result = 'application/x-bittorrent';
      break;
    case 'chat':
      result = 'application/x-chat';
      break;
    case 'cfs':
      result = 'application/x-cfs-compressed';
      break;
    case 'vcd':
      result = 'application/x-cdlink';
      break;
    case 'nsc':
      result = 'application/x-conference';
      break;
    case 'cpio':
      result = 'application/x-cpio';
      break;
    case 'pgn':
      result = 'application/x-chess-pgn';
      break;
    case 'deb':
    case 'udeb':
      result = 'application/x-debian-package';
      break;
    case 'dir':
    case 'dcr':
    case 'dxr':
    case 'cst':
    case 'cct':
    case 'cxt':
    case 'w3d':
    case 'fgd':
    case 'swa':
      result = 'application/x-director';
      break;
    case 'wad':
      result = 'application/x-doom';
      break;
    case 'dgc':
      result = 'application/x-dgc-compressed';
      break;
    case 'dtb':
      result = 'application/x-dtbook+xml';
      break;
    case 'ncx':
      result = 'application/x-dtbncx+xml';
      break;
    case 'res':
      result = 'application/x-dtbresource+xml';
      break;
    case 'dvi':
      result = 'application/x-dvi';
      break;
    case 'evy':
      result = 'application/x-envoy';
      break;
    case 'csh':
      result = 'application/x-csh';
      break;
    case 'bdf':
      result = 'application/x-font-bdf';
      break;
    case 'gsf':
      result = 'application/x-font-ghostscript';
      break;
    case 'pcf':
      result = 'application/x-font-pcf';
      break;
    case 'psf':
      result = 'application/x-font-linux-psf';
      break;
    case 'pfa':
    case 'pfb':
    case 'pfm':
    case 'afm':
      result = 'application/x-font-type1';
      break;
    case 'snf':
      result = 'application/x-font-snf';
      break;
    case 'arc':
      result = 'application/x-freearc';
      break;
    case 'spl':
      result = 'application/x-futuresplash';
      break;
    case 'gca':
      result = 'application/x-gca-compressed';
      break;
    case 'ulx':
      result = 'application/x-glulx';
      break;
    case 'gramps':
      result = 'application/x-gramps-xml';
      break;
    case 'eva':
      result = 'application/x-eva';
      break;
    case 'gtar':
      result = 'application/x-gtar';
      break;
    case 'install':
      result = 'application/x-install-instructions';
      break;
    case 'iso':
      result = 'application/x-iso9660-image';
      break;
    case 'jnlp':
      result = 'application/x-java-jnlp-file';
      break;
    case 'hdf':
      result = 'application/x-hdf';
      break;
    case 'gnumeric':
      result = 'application/x-gnumeric';
      break;
    case 'lzh':
    case 'lha':
      result = 'application/x-lzh-compressed';
      break;
    case 'prc':
    case 'mobi':
      result = 'application/x-mobipocket-ebook';
      break;
    case 'latex':
      result = 'application/x-latex';
      break;
    case 'application':
      result = 'application/x-ms-application';
      break;
    case 'lnk':
      result = 'application/x-ms-shortcut';
      break;
    case 'wmd':
      result = 'application/x-ms-wmd';
      break;
    case 'xbap':
      result = 'application/x-ms-xbap';
      break;
    case 'mdb':
      result = 'application/x-msaccess';
      break;
    case 'mie':
      result = 'application/x-mie';
      break;
    case 'wmz':
      result = 'application/x-ms-wmz';
      break;
    case 'clp':
      result = 'application/x-msclip';
      break;
    case 'obd':
      result = 'application/x-msbinder';
      break;
    case 'exe':
    case 'dll':
    case 'com':
    case 'bat':
    case 'msi':
      result = 'application/x-msdownload';
      break;
    case 'wmf':
    case 'wmz':
    case 'emf':
    case 'emz':
      result = 'application/x-msmetafile';
      break;
    case 'mvb':
    case 'm13':
    case 'm14':
      result = 'application/x-msmediaview';
      break;
    case 'crd':
      result = 'application/x-mscardfile';
      break;
    case 'pub':
      result = 'application/x-mspublisher';
      break;
    case 'mny':
      result = 'application/x-msmoney';
      break;
    case 'scd':
      result = 'application/x-msschedule';
      break;
    case 'nc':
    case 'cdf':
      result = 'application/x-netcdf';
      break;
    case 'nzb':
      result = 'application/x-nzb';
      break;
    case 'wri':
      result = 'application/x-mswrite';
      break;
    case 'trm':
      result = 'application/x-msterminal';
      break;
    case 'p12':
    case 'pfx':
      result = 'application/x-pkcs12';
      break;
    case 'p7b':
    case 'spc':
      result = 'application/x-pkcs7-certificates';
      break;
    case 'ris':
      result = 'application/x-research-info-systems';
      break;
    case 'p7r':
      result = 'application/x-pkcs7-certreqresp';
      break;
    case 'sh':
      result = 'application/x-sh';
      break;
    case 'shar':
      result = 'application/x-shar';
      break;
    case 'rar':
      result = 'application/x-rar-compressed';
      break;
    case 'swf':
      result = 'application/x-shockwave-flash';
      break;
    case 'sit':
      result = 'application/x-stuffit';
      break;
    case 'sql':
      result = 'application/x-sql';
      break;
    case 'xap':
      result = 'application/x-silverlight-app';
      break;
    case 'sitx':
      result = 'application/x-stuffitx';
      break;
    case 'sv4cpio':
      result = 'application/x-sv4cpio';
      break;
    case 't3':
      result = 'application/x-t3vm-image';
      break;
    case 'sv4crc':
      result = 'application/x-sv4crc';
      break;
    case 'tar':
      result = 'application/x-tar';
      break;
    case 'srt':
      result = 'application/x-subrip';
      break;
    case 'tcl':
      result = 'application/x-tcl';
      break;
    case 'gam':
      result = 'application/x-tads';
      break;
    case 'tfm':
      result = 'application/x-tex-tfm';
      break;
    case 'texinfo':
    case 'texi':
      result = 'application/x-texinfo';
      break;
    case 'obj':
      result = 'application/x-tgif';
      break;
    case 'ustar':
      result = 'application/x-ustar';
      break;
    case 'src':
      result = 'application/x-wais-source';
      break;
    case 'der':
    case 'crt':
      result = 'application/x-x509-ca-cert';
      break;
    case 'tex':
      result = 'application/x-tex';
      break;
    case 'fig':
      result = 'application/x-xfig';
      break;
    case 'xpi':
      result = 'application/x-xpinstall';
      break;
    case 'z1':
    case 'z2':
    case 'z3':
    case 'z4':
    case 'z5':
    case 'z6':
    case 'z7':
    case 'z8':
      result = 'application/x-zmachine';
      break;
    case 'xlf':
      result = 'application/x-xliff+xml';
      break;
    case 'xdf':
      result = 'application/xcap-diff+xml';
      break;
    case 'xaml':
      result = 'application/xaml+xml';
      break;
    case 'xz':
      result = 'application/x-xz';
      break;
    case 'xenc':
      result = 'application/xenc+xml';
      break;
    case 'dtd':
      result = 'application/xml-dtd';
      break;
    case 'xhtml':
    case 'xht':
      result = 'application/xhtml+xml';
      break;
    case 'xpl':
      result = 'application/xproc+xml';
      break;
    case 'xml':
    case 'xsl':
      result = 'application/xml';
      break;
    case 'xspf':
      result = 'application/xspf+xml';
      break;
    case 'xslt':
      result = 'application/xslt+xml';
      break;
    case 'mxml':
    case 'xhvml':
    case 'xvml':
    case 'xvm':
      result = 'application/xv+xml';
      break;
    case 'yang':
      result = 'application/yang';
      break;
    case 'yin':
      result = 'application/yin+xml';
      break;
    case 'adp':
      result = 'audio/adpcm';
      break;
    case 'xop':
      result = 'application/xop+xml';
      break;
    case 'au':
    case 'snd':
      result = 'audio/basic';
      break;
    case 'mid':
    case 'midi':
    case 'kar':
    case 'rmi':
      result = 'audio/midi';
      break;
    case 'mpga':
    case 'mp2':
    case 'mp2a':
    case 'mp3':
    case 'm2a':
    case 'm3a':
      result = 'audio/mpeg';
      break;
    case 'm4a':
    case 'mp4a':
      result = 'audio/mp4';
      break;
    case 'oga':
    case 'ogg':
    case 'spx':
      result = 'audio/ogg';
      break;
    case 's3m':
      result = 'audio/s3m';
      break;
    case 'sil':
      result = 'audio/silk';
      break;
    case 'zip':
      result = 'application/zip';
      break;
    case 'uva':
    case 'uvva':
      result = 'audio/vnd.dece.audio';
      break;
    case 'dts':
      result = 'audio/vnd.dts';
      break;
    case 'eol':
      result = 'audio/vnd.digital-winds';
      break;
    case 'lvp':
      result = 'audio/vnd.lucent.voice';
      break;
    case 'dra':
      result = 'audio/vnd.dra';
      break;
    case 'pya':
      result = 'audio/vnd.ms-playready.media.pya';
      break;
    case 'dtshd':
      result = 'audio/vnd.dts.hd';
      break;
    case 'ecelp4800':
      result = 'audio/vnd.nuera.ecelp4800';
      break;
    case 'ecelp7470':
      result = 'audio/vnd.nuera.ecelp7470';
      break;
    case 'rip':
      result = 'audio/vnd.rip';
      break;
    case 'ecelp9600':
      result = 'audio/vnd.nuera.ecelp9600';
      break;
    case 'aif':
    case 'aiff':
    case 'aifc':
      result = 'audio/x-aiff';
      break;
    case 'caf':
      result = 'audio/x-caf';
      break;
    case 'flac':
      result = 'audio/x-flac';
      break;
    case 'mka':
      result = 'audio/x-matroska';
      break;
    case 'm3u':
      result = 'audio/x-mpegurl';
      break;
    case 'wax':
      result = 'audio/x-ms-wax';
      break;
    case 'weba':
      result = 'audio/webm';
      break;
    case 'ram':
    case 'ra':
      result = 'audio/x-pn-realaudio';
      break;
    case 'wma':
      result = 'audio/x-ms-wma';
      break;
    case 'rmp':
      result = 'audio/x-pn-realaudio-plugin';
      break;
    case 'xm':
      result = 'audio/xm';
      break;
    case 'aac':
      result = 'audio/x-aac';
      break;
    case 'cdx':
      result = 'chemical/x-cdx';
      break;
    case 'cmdf':
      result = 'chemical/x-cmdf';
      break;
    case 'wav':
      result = 'audio/x-wav';
      break;
    case 'cml':
      result = 'chemical/x-cml';
      break;
    case 'xyz':
      result = 'chemical/x-xyz';
      break;
    case 'csml':
      result = 'chemical/x-csml';
      break;
    case 'ttc':
      result = 'font/collection';
      break;
    case 'otf':
      result = 'font/otf';
      break;
    case 'cif':
      result = 'chemical/x-cif';
      break;
    case 'ttf':
      result = 'font/ttf';
      break;
    case 'woff2':
      result = 'font/woff2';
      break;
    case 'woff':
      result = 'font/woff';
      break;
    case 'cgm':
      result = 'image/cgm';
      break;
    case 'g3':
      result = 'image/g3fax';
      break;
    case 'bmp':
      result = 'image/bmp';
      break;
    case 'gif':
      result = 'image/gif';
      break;
    case 'jpeg':
    case 'jpg':
    case 'jpe':
      result = 'image/jpeg';
      break;
    case 'ktx':
      result = 'image/ktx';
      break;
    case 'ief':
      result = 'image/ief';
      break;
    case 'btif':
      result = 'image/prs.btif';
      break;
    case 'svg':
    case 'svgz':
      result = 'image/svg+xml';
      break;
    case 'png':
      result = 'image/png';
      break;
    case 'tiff':
    case 'tif':
      result = 'image/tiff';
      break;
    case 'psd':
      result = 'image/vnd.adobe.photoshop';
      break;
    case 'djvu':
    case 'djv':
      result = 'image/vnd.djvu';
      break;
    case 'uvi':
    case 'uvvi':
    case 'uvg':
    case 'uvvg':
      result = 'image/vnd.dece.graphic';
      break;
    case 'dwg':
      result = 'image/vnd.dwg';
      break;
    case 'sgi':
      result = 'image/sgi';
      break;
    case 'sub':
      result = 'image/vnd.dvb.subtitle';
      break;
    case 'dxf':
      result = 'image/vnd.dxf';
      break;
    case 'fbs':
      result = 'image/vnd.fastbidsheet';
      break;
    case 'mmr':
      result = 'image/vnd.fujixerox.edmics-mmr';
      break;
    case 'fst':
      result = 'image/vnd.fst';
      break;
    case 'rlc':
      result = 'image/vnd.fujixerox.edmics-rlc';
      break;
    case 'fpx':
      result = 'image/vnd.fpx';
      break;
    case 'mdi':
      result = 'image/vnd.ms-modi';
      break;
    case 'wdp':
      result = 'image/vnd.ms-photo';
      break;
    case 'xif':
      result = 'image/vnd.xiff';
      break;
    case 'wbmp':
      result = 'image/vnd.wap.wbmp';
      break;
    case '3ds':
      result = 'image/x-3ds';
      break;
    case 'npx':
      result = 'image/vnd.net-fpx';
      break;
    case 'ras':
      result = 'image/x-cmu-raster';
      break;
    case 'cmx':
      result = 'image/x-cmx';
      break;
    case 'webp':
      result = 'image/webp';
      break;
    case 'fh':
    case 'fhc':
    case 'fh4':
    case 'fh5':
    case 'fh7':
      result = 'image/x-freehand';
      break;
    case 'pcx':
      result = 'image/x-pcx';
      break;
    case 'ico':
      result = 'image/x-icon';
      break;
    case 'pic':
    case 'pct':
      result = 'image/x-pict';
      break;
    case 'pbm':
      result = 'image/x-portable-bitmap';
      break;
    case 'pgm':
      result = 'image/x-portable-graymap';
      break;
    case 'rgb':
      result = 'image/x-rgb';
      break;
    case 'ppm':
      result = 'image/x-portable-pixmap';
      break;
    case 'sid':
      result = 'image/x-mrsid-image';
      break;
    case 'pnm':
      result = 'image/x-portable-anymap';
      break;
    case 'tga':
      result = 'image/x-tga';
      break;
    case 'xbm':
      result = 'image/x-xbitmap';
      break;
    case 'xwd':
      result = 'image/x-xwindowdump';
      break;
    case 'igs':
    case 'iges':
      result = 'model/iges';
      break;
    case 'eml':
    case 'mime':
      result = 'message/rfc822';
      break;
    case 'msh':
    case 'mesh':
    case 'silo':
      result = 'model/mesh';
      break;
    case 'dwf':
      result = 'model/vnd.dwf';
      break;
    case 'dae':
      result = 'model/vnd.collada+xml';
      break;
    case 'xpm':
      result = 'image/x-xpixmap';
      break;
    case 'gtw':
      result = 'model/vnd.gtw';
      break;
    case 'mts':
      result = 'model/vnd.mts';
      break;
    case 'wrl':
    case 'vrml':
      result = 'model/vrml';
      break;
    case 'vtu':
      result = 'model/vnd.vtu';
      break;
    case 'x3db':
    case 'x3dbz':
      result = 'model/x3d+binary';
      break;
    case 'gdl':
      result = 'model/vnd.gdl';
      break;
    case 'x3dv':
    case 'x3dvz':
      result = 'model/x3d+vrml';
      break;
    case 'x3d':
    case 'x3dz':
      result = 'model/x3d+xml';
      break;
    case 'ics':
    case 'ifb':
      result = 'text/calendar';
      break;
    case 'css':
      result = 'text/css';
      break;
    case 'csv':
      result = 'text/csv';
      break;
    case 'html':
    case 'htm':
      result = 'text/html';
      break;
    case 'txt':
    case 'text':
    case 'conf':
    case 'def':
    case 'list':
    case 'log':
    case 'in':
      result = 'text/plain';
      break;
    case 'appcache':
      result = 'text/cache-manifest';
      break;
    case 'n3':
      result = 'text/n3';
      break;
    case 'dsc':
      result = 'text/prs.lines.tag';
      break;
    case 'sgml':
    case 'sgm':
      result = 'text/sgml';
      break;
    case 't':
    case 'tr':
    case 'roff':
    case 'man':
    case 'me':
    case 'ms':
      result = 'text/troff';
      break;
    case 'ttl':
      result = 'text/turtle';
      break;
    case 'tsv':
      result = 'text/tab-separated-values';
      break;
    case 'uri':
    case 'uris':
    case 'urls':
      result = 'text/uri-list';
      break;
    case 'curl':
      result = 'text/vnd.curl';
      break;
    case 'rtx':
      result = 'text/richtext';
      break;
    case 'mcurl':
      result = 'text/vnd.curl.mcurl';
      break;
    case 'vcard':
      result = 'text/vcard';
      break;
    case 'scurl':
      result = 'text/vnd.curl.scurl';
      break;
    case 'fly':
      result = 'text/vnd.fly';
      break;
    case 'dcurl':
      result = 'text/vnd.curl.dcurl';
      break;
    case 'gv':
      result = 'text/vnd.graphviz';
      break;
    case 'flx':
      result = 'text/vnd.fmi.flexstor';
      break;
    case 'spot':
      result = 'text/vnd.in3d.spot';
      break;
    case 'sub':
      result = 'text/vnd.dvb.subtitle';
      break;
    case 'jad':
      result = 'text/vnd.sun.j2me.app-descriptor';
      break;
    case 'wmls':
      result = 'text/vnd.wap.wmlscript';
      break;
    case 'c':
    case 'cc':
    case 'cxx':
    case 'cpp':
    case 'h':
    case 'hh':
    case 'dic':
      result = 'text/x-c';
      break;
    case 's':
    case 'asm':
      result = 'text/x-asm';
      break;
    case 'f':
    case 'for':
    case 'f77':
    case 'f90':
      result = 'text/x-fortran';
      break;
    case 'java':
      result = 'text/x-java-source';
      break;
    case 'nfo':
      result = 'text/x-nfo';
      break;
    case 'opml':
      result = 'text/x-opml';
      break;
    case 'p':
    case 'pas':
      result = 'text/x-pascal';
      break;
    case 'wml':
      result = 'text/vnd.wap.wml';
      break;
    case '3dml':
      result = 'text/vnd.in3d.3dml';
      break;
    case 'sfv':
      result = 'text/x-sfv';
      break;
    case 'uu':
      result = 'text/x-uuencode';
      break;
    case 'vcs':
      result = 'text/x-vcalendar';
      break;
    case 'vcf':
      result = 'text/x-vcard';
      break;
    case 'etx':
      result = 'text/x-setext';
      break;
    case 'h261':
      result = 'video/h261';
      break;
    case '3g2':
      result = 'video/3gpp2';
      break;
    case 'h263':
      result = 'video/h263';
      break;
    case 'jpgv':
      result = 'video/jpeg';
      break;
    case 'jpm':
    case 'jpgm':
      result = 'video/jpm';
      break;
    case 'mj2':
    case 'mjp2':
      result = 'video/mj2';
      break;
    case 'mp4':
    case 'mp4v':
    case 'mpg4':
      result = 'video/mp4';
      break;
    case 'mpeg':
    case 'mpg':
    case 'mpe':
    case 'm1v':
    case 'm2v':
      result = 'video/mpeg';
      break;
    case '3gp':
      result = 'video/3gpp';
      break;
    case 'h264':
      result = 'video/h264';
      break;
    case 'uvh':
    case 'uvvh':
      result = 'video/vnd.dece.hd';
      break;
    case 'ogv':
      result = 'video/ogg';
      break;
    case 'uvm':
    case 'uvvm':
      result = 'video/vnd.dece.mobile';
      break;
    case 'uvp':
    case 'uvvp':
      result = 'video/vnd.dece.pd';
      break;
    case 'uvs':
    case 'uvvs':
      result = 'video/vnd.dece.sd';
      break;
    case 'qt':
    case 'mov':
      result = 'video/quicktime';
      break;
    case 'uvv':
    case 'uvvv':
      result = 'video/vnd.dece.video';
      break;
    case 'fvt':
      result = 'video/vnd.fvt';
      break;
    case 'mxu':
    case 'm4u':
      result = 'video/vnd.mpegurl';
      break;
    case 'pyv':
      result = 'video/vnd.ms-playready.media.pyv';
      break;
    case 'viv':
      result = 'video/vnd.vivo';
      break;
    case 'uvu':
    case 'uvvu':
      result = 'video/vnd.uvvu.mp4';
      break;
    case 'webm':
      result = 'video/webm';
      break;
    case 'dvb':
      result = 'video/vnd.dvb.file';
      break;
    case 'fli':
      result = 'video/x-fli';
      break;
    case 'flv':
      result = 'video/x-flv';
      break;
    case 'm4v':
      result = 'video/x-m4v';
      break;
    case 'mkv':
    case 'mk3d':
    case 'mks':
      result = 'video/x-matroska';
      break;
    case 'asf':
    case 'asx':
      result = 'video/x-ms-asf';
      break;
    case 'vob':
      result = 'video/x-ms-vob';
      break;
    case 'wm':
      result = 'video/x-ms-wm';
      break;
    case 'f4v':
      result = 'video/x-f4v';
      break;
    case 'wmv':
      result = 'video/x-ms-wmv';
      break;
    case 'wmx':
      result = 'video/x-ms-wmx';
      break;
    case 'avi':
      result = 'video/x-msvideo';
      break;
    case 'movie':
      result = 'video/x-sgi-movie';
      break;
    case 'wvx':
      result = 'video/x-ms-wvx';
      break;
    case 'ice':
      result = 'x-conference/x-cooltalk';
      break;
    case 'mng':
      result = 'video/x-mng';
      break;
    case 'smv':
      result = 'video/x-smv';
      break;
    default:
      result = 'application/octet-stream';
      break;
  }
  return (encoding ? result + ';charset=' + encoding : result);

}