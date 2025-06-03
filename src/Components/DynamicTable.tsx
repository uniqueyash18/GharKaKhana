import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';

// Table Props
type TableProps = {
  data: string[][];
  headers?: string[];
};

const DynamicTable: React.FC<TableProps> = ({ data, headers }) => {
  return (
    <View style={styles.container}>
      {/* Table Header */}
      {headers && (
        <View style={styles.headerRow}>
          {headers.map((header, index) => (
            <View key={index} style={[styles.headerCell]}>
              <Text style={styles.headerText}>{header}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Table Rows */}
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: row, index: rowIndex }) => (
          <View style={styles.row}>
            {row.map((cellData, colIndex) => (
              <View
                key={colIndex}
                style={[styles.cell, styles.shadow, rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow]}
              >
                <Text style={styles.cellText}>{cellData}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: moderateScale(14),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4a90e2',
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateVerticalScale(8),
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: scale(14),
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(12),
    borderBottomWidth: 1,
    borderColor: '#ececec',
  },
  cellText: {
    fontSize: scale(14),
    color: '#444',
    fontWeight: '600',
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#f8f9fd',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
export default DynamicTable;
