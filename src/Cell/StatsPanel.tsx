import { Box, Button, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import { useState } from 'react';
import { Checkmark } from './Checkmark';
import { formatting } from './formatting';
import { styles } from './styles';
import { CellIntrospectionData } from './types';

export interface StatsPanelArgs {
  introspectionData: CellIntrospectionData;
  handleCopyButtonVisibilityChange: (visible: boolean) => any;
  handleClose: () => any;
  theme: Theme;
}

const statsStyles = {
  header: {
    borderBottom: '1px solid grey',
    gridColumn: '1 / 5',
  },
  itemLabel: {
    gridColumn: '1 / 3',
    textAlign: 'right',
  },
  itemContent: {
    gridColumn: '3 / 5',
  },
};

export const StatsPanel = ({
  introspectionData,
  handleCopyButtonVisibilityChange,
  handleClose,
  theme,
}: StatsPanelArgs) => {
  const {
    userId,
    logUserId,
    requestId,
    insertionId,
    promotedRank,
    retrievalRank,
    pClick,
    pPurchase,
    queryRelevance,
    personalization,
  } = introspectionData;

  const ids = [
    ['User ID', userId],
    ['Log User ID', logUserId],
    ['Request ID', requestId],
    ['Insertion ID', insertionId],
  ];
  const ranks = [
    ['Promoted', promotedRank],
    ['Retrieval', `${retrievalRank} (${formatting.difference((retrievalRank ?? 0) - (promotedRank ?? 0))})`],
  ];
  const stats = [
    ['p(Click)', pClick],
    ['p(Purchase)', pPurchase],
    ['30 Day Impr', queryRelevance],
    ['CTR', queryRelevance],
    ['Post-Click CVR', queryRelevance],
    ['Personalization', personalization],
    ['Price', queryRelevance],
  ];

  const introspectionRows = (
    title: string,
    content: (string | number | undefined)[][],
    labelColumns: any,
    contentColumns: any
  ) => (
    <>
      <Box sx={statsStyles.header}>
        <Typography>{title}</Typography>
      </Box>
      {content.map((item) => (
        <>
          <Box sx={{ ...statsStyles.itemLabel, gridColumn: labelColumns }}>
            <Typography>{item[0]}:</Typography>
          </Box>
          <Box sx={{ ...statsStyles.itemContent, gridColumn: contentColumns }}>
            <Typography>{item[1] ?? '-'}</Typography>
          </Box>
        </>
      ))}
    </>
  );

  const [copyButtonVisible, setCopyButtonVisible] = useState(true);
  const handleCopyIds = () => {
    setCopyButtonVisible(false);
    handleCopyButtonVisibilityChange(false);
    setTimeout(() => {
      setCopyButtonVisible(true);
      handleCopyButtonVisibilityChange(true);
    }, 2000);
  };

  const handleRequestReport = () => {
    const link = document.createElement('a');
    link.href = `mailto:introspection@promoted.ai?subject=${encodeURIComponent(
      'Introspection Report Request'
    )}&body=${encodeURIComponent(JSON.stringify({ userId, logUserId, requestId, insertionId }))}`;
    link.click();
  };

  return (
    <Box
      sx={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        ...styles.tabContentContainer(theme),
      }}
    >
      {introspectionRows('IDs', ids, '1 / 2', '2 / 5')}
      {introspectionRows('Ranks', ranks, '1 / 3', '3 / 5')}
      {introspectionRows('Statistics', stats, '1 / 3', '3 / 5')}

      <Box sx={styles.buttonContainer(theme)}>
        {copyButtonVisible ? (
          <Button onClick={handleCopyIds} sx={styles.button(theme)} variant="outlined">
            Copy
          </Button>
        ) : (
          <Box
            sx={{
              alignContent: 'center',
              display: 'inline-grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              marginRight: '8px',
              verticalAlign: 'middle',
            }}
          >
            <Box sx={{ gridColumn: '1 / 2', marginRight: '4px' }}>
              <Checkmark />
            </Box>
            <Typography sx={{ fontSize: 14, gridColumn: '2 / 4' }}>Copied</Typography>
          </Box>
        )}
        <Button onClick={handleRequestReport} sx={styles.button(theme)} variant="outlined">
          Request Report...
        </Button>
        <Button onClick={handleClose} sx={styles.button(theme)} variant="contained">
          Close
        </Button>
      </Box>
    </Box>
  );
};
