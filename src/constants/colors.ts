export const Colors = {
   White: '#FFFFFF',
   Success: '#2FB755',
   Danger: '#CF2A2A',
   Info: '#3FA2F7',
   Primary: '#CF2A2A',
   LightPrimary: '#E8C8C85E',
   Secondary: '',
   Warning: '',
   DarkGreen: '#15692A',
   DarkBlue: '#0050C8',
   DarKRed: '#9F1F17',
   TextGray: '#636363',
   LightGray: '#AAAAAA',
   LightGray1: '#D8DAE5',
   LightGray3: '#8F8F8F',
   LightGray4: '#BCBBBB',
   LightGray5: '#667085',
   LightGray6: '#E5E9EB',
   BorderGray: '#C2C9D1',
   TableBgRed: '#FFFBFB',
   Pink: '#FFE9E9',
   Gray50: '#F7F7F7',
   BorderGray1: '#E5E9EB',
   /** For white text on dark Bg. */
   LightGray2: '#F6F8F9',
   Gray: '#808080',
   DarkGray: '#1E0A3C',
   /** For dark large text. */
   DarKGray1: '#252C32',
   /** For red chip bg with {@linkcode Colors.DarKRed} text on it. */
   BgCardRed: '#FFD4D2',
   /** For blue chip bg with {@linkcode Colors.DarkBlue} text on it. */
   BgCardInfo: '#F0F5FF',
   /** For green chip bg with {@linkcode Colors.DarkGreen} text on it. */
   BgCardSuccess: '#D4F7DC',
   /** For gray chip bg with {@linkcode Colors.DarkGray} text on it. */
   BgCardGray: '#E5E5EA',
   LinearGradient: 'linear-gradient(90deg, #783B96 0%, #C5593C 100%)',
} as const;

export const ColorMaps = {
   success: { backgroundColor: Colors.BgCardSuccess, color: Colors.DarkGreen },
   info: { backgroundColor: Colors.BgCardInfo, color: Colors.DarkBlue },
   error: { backgroundColor: Colors.BgCardRed, color: Colors.DarKRed },
   default: { backgroundColor: Colors.BgCardGray, color: Colors.DarkGray },
   plain: { color: '#1E0A3C', bgcolor: '#E5E5EA' },
   active: { color: '#15692A', bgcolor: '#D4F7DC' },
   watchList: { color: '#0050C8', bgcolor: '#F0F5FF' },
   substandard: { color: '#806B00', bgcolor: '#FFF8CC' },
   doubtful: { color: '#804C00', bgcolor: '#FFEBCC' },
   lost: { color: '#9F1F17', bgcolor: '#FFD4D2' },
};

export const statusColors = (status: string) => {
   switch (status) {
      case 'Active':
      case 'Performing':
      case 'Settled':
      case 'Approved':
         return ColorMaps.active;
      case 'Watchlist':
      case 'Pending':
      case 'In-Review':
         return ColorMaps.watchList;
      case 'Substandard':
      case 'Non-Performing':
         return ColorMaps.substandard;
      case 'Doubtful':
         return ColorMaps.doubtful;
      case 'Lost':
      case 'In-Issue':
      case 'Reject':
      case 'Rejected':
         return ColorMaps.lost;
      case 'Closed':
         return ColorMaps.plain;
      default:
         return ColorMaps.plain;
   }
};
