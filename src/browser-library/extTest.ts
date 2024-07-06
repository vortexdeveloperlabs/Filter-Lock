// The list comes from https://github.com/ading2210/dextensify/blob/master/main.html#L68C7-L165C9
const dextensifyExtsList: FilterLockBrowserLibrary.ExtList = {
	securly_new: {
		name: "Securly",
		url: "chrome-extension://joflmkccibkooplaeoinecjbmdebglab/fonts/Metropolis.css",
	},
	securly_old: {
		name: "Securly (old)",
		url: "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/fonts/Metropolis.css",
	},
	goguardian: {
		name: "Goguardian",
		url: "chrome-extension://haldlgldplgnggkjaafhelgiaglafanh/youtube_injection.js",
	},
	lanschool: {
		name: "LANSchool",
		url: "chrome-extension://baleiojnjpgeojohhhfbichcodgljmnj/blocked.html",
	},
	linewize: {
		name: "Linewize",
		url: "chrome-extension://ddfbkhpmcdbciejenfcolaaiebnjcbfc/background/assets/pages/default-blocked.html",
	},
	blocksi: {
		name: "Blocksi",
		url: "chrome-extension://ghlpmldmjjhmdgmneoaibbegkjjbonbk/pages/blockPage.html",
	},
	fortiguard: {
		name: "Fortiguard",
		url: "chrome-extension://igbgpehnbmhgdgjbhkkpedommgmfbeao/youtube_injection.js",
	},
	cisco: {
		name: "Cisco Umbrella",
		url: "chrome-extension://jcdhmojfecjfmbdpchihbeilohgnbdci/blocked.html",
	},
	contentkeeper: {
		name: "ContentKeeper",
		url: "chrome-extension://jdogphakondfdmcanpapfahkdomaicfa/img/ckauth19x.png",
	},
	contentkeeperg3: {
		name: "CK-Authenticator G3",
		url: "chrome-extension://odoanpnonilogofggaohhkdkdgbhdljp/img/ckauth19x.png",
	},
	securlyclassroom: {
		name: "Securly Classroom",
		url: "chrome-extension://jfbecfmiegcjddenjhlbhlikcbfmnafd/notfound.html",
	},
	hapara: {
		name: "Hapara",
		url: "chrome-extension://kbohafcopfpigkjdimdcdgenlhkmhbnc/blocked.html",
	},
	"hapara-new-id": {
		name: "Hapara",
		url: "chrome-extension://aceopacgaepdcelohobicpffbbejnfac/blocked.html",
	},
	iboss: {
		name: "iboss",
		url: "chrome-extension://kmffehbidlalibfeklaefnckpidbodff/restricted.html",
	},
	lightspeedfilteragent: {
		name: "Lightspeed Filter Agent",
		url: "chrome-extension://adkcpkpghahmbopkjchobieckeoaoeem/icon-128.png",
	},
	lightspeedclassroom: {
		name: "Lightspeed Classroom",
		url: "chrome-extension://kkbmdgjggcdajckdlbngdjonpchpaiea/assets/icon-classroom-128.png",
	},
	interclass: {
		name: "InterCLASS Filtering Service",
		url: "chrome-extension://jbddgjglgkkneonnineaohdhabjbgopi/pages/message-page.html",
	},
	intersafe: {
		name: "InterSafe GatewayConnection Agent",
		url: "chrome-extension://ecjoghccnjlodjlmkgmnbnkdcbnjgden/resources/options.js",
	},
	loilo: {
		name: "ロイロWebフィルター/LoiLo Web Filters",
		url: "chrome-extension://pabjlbjcgldndnpjnokjakbdofjgnfia/image/allow_icon/shield_green_128x128.png",
	},
	gopher_buddy: {
		name: "Gopher Buddy",
		url: "chrome-extension://cgbbbjmgdpnifijconhamggjehlamcif/images/gopher-buddy_128x128_color.png",
	},
	lanschool_helper: {
		name: "LanSchool Web Helper",
		url: "chrome-extension://honjcnefekfnompampcpmcdadibmjhlk/blocked.html",
	},
	imtlazarus: {
		name: "IMTLazarus",
		url: "chrome-extension://cgigopjakkeclhggchgnhmpmhghcbnaf/models/model.json",
	},
	impero_backdrop: {
		name: "Impero Backdrop",
		url: "chrome-extension://jjpmjccpemllnmgiaojaocgnakpmfgjg/licenses.html",
	},
	mobile_guardian: {
		name: "Mobile Guardian",
		url: "chrome-extension://fgmafhdohjkdhfaacgbgclmfgkgokgmb/block.html",
	},
};

let extensionsFound: ExtList = {};
for (const [filterId, filterInfo] of Object.entries(dextensifyExtsList))
	isExtensionEnabled(filterInfo.url).then(res => {
		if (res) extensionsFound[filterId] = filterInfo;
	});

async function isExtensionEnabled(extensionURL) {
	const abortController = new AbortController();

	try {
		await fetch(extensionURL, { signal: abortController.signal });
		return true;
	} catch (err) {
		if (err.msg.startsWith("AbortError:")) return false;
	}
}

window.hasFilterExtensions = Object.keys(extensionsFound).length > 0;
