import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { paperData } from '../lib/paperData';
import { StudentInfo } from '../lib/generateDocx';

// Register fonts if necessary, default fonts are usually fine for simple text, but let's stick to default
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  headerLarge: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 2,
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
    color: '#003366',
  },
  boldText: {
    fontWeight: 'bold',
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletPoint: {
    width: 15,
  },
  bulletText: {
    flex: 1,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    padding: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    textAlign: 'center',
  },
  facultySection: {
    marginTop: 20,
  },
  facultyRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    textAlign: 'center',
  }
});

export const PdfDocument = ({ studentInfo }: { studentInfo: StudentInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.headerText}>SHALAKA FOUNDATION’S</Text>
      <Text style={styles.headerLarge}>KEYSTONE SCHOOL OF ENGINEERING</Text>
      <Text style={styles.headerText}>DEPARTMENT OF COMPUTER ENGINEERING</Text>
      <Text style={styles.centerText}>Keystone School of Engineering, Near Handewadi Chowk, Uruli Devachi, Pune– 412308</Text>
      <Text style={styles.centerText}>www.keystoneschoolofengineering.com</Text>

      <View style={styles.rowInfo}>
        <Text>A.Y. 2026-27</Text>
        <Text>Sem-I</Text>
        <Text>Year: TE</Text>
      </View>

      <Text style={styles.headerLarge}>Technical Seminar</Text>
      <Text style={[styles.headerText, { marginTop: 10, marginBottom: 20, color: '#0033aa' }]}>
        TECHNICAL SEMINAR TITLE SUBMISSION
      </Text>

      <Text style={styles.sectionTitle}>1. Seminar Title</Text>
      <Text><Text style={styles.boldText}>Title of Seminar Title: </Text>{studentInfo.seminarTitle}</Text>

      <Text style={styles.sectionTitle}>2. Research Paper Details</Text>
      <Text>• <Text style={styles.boldText}>Authors: </Text>{paperData.authors}</Text>
      <Text>• <Text style={styles.boldText}>Conference/Journal: </Text>{paperData.conference}</Text>
      <Text>• <Text style={styles.boldText}>Year: </Text>{paperData.year}</Text>
      <Text>• <Text style={styles.boldText}>DOI: </Text>{paperData.doi}</Text>

      <Text style={styles.sectionTitle}>3. Introduction</Text>
      <Text>{paperData.introduction}</Text>

      <Text style={styles.sectionTitle}>4. Problem Statement</Text>
      <Text>{paperData.problemStatement}</Text>

      <Text style={styles.sectionTitle}>5. Objectives</Text>
      {paperData.objectives.map((obj, i) => (
        <View key={i} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{obj}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>6. Proposed Methodology</Text>
      <Text>{paperData.proposedMethodology}</Text>

      <Text style={styles.sectionTitle}>7. Technologies Used</Text>
      {paperData.technologiesUsed.map((tech, i) => (
        <View key={i} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{tech}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>8. Applications</Text>
      {paperData.applications.map((app, i) => (
        <View key={i} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{app}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>9. Advantages</Text>
      {paperData.advantages.map((adv, i) => (
        <View key={i} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{adv}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>10. Limitations</Text>
      {paperData.limitations.map((lim, i) => (
        <View key={i} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{lim}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>11. Future Scope</Text>
      {paperData.futureScope.map((fs, i) => (
        <View key={i} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{fs}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>12. Results</Text>
      <Text>{paperData.results}</Text>

      <Text style={styles.sectionTitle}>13. Conclusion</Text>
      <Text>{paperData.conclusion}</Text>

      <Text style={styles.sectionTitle}>14. References</Text>
      <Text>{paperData.references}</Text>

      <Text style={styles.sectionTitle}>15. Student Details</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableColHeader, { width: '25%' }]}>Roll No</Text>
          <Text style={[styles.tableColHeader, { width: '50%' }]}>Name of Student</Text>
          <Text style={[styles.tableColHeader, { width: '25%' }]}>PRN</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, { width: '25%' }]}>{studentInfo.rollNo}</Text>
          <Text style={[styles.tableCol, { width: '50%' }]}>{studentInfo.name}</Text>
          <Text style={[styles.tableCol, { width: '25%' }]}>{studentInfo.prn}</Text>
        </View>
      </View>

      <View style={styles.facultySection}>
        <Text style={[styles.boldText, { fontSize: 14, marginBottom: 10 }]}>Faculty Use Only</Text>
        <Text style={{ marginBottom: 5 }}>● <Text style={styles.boldText}>Title Status:</Text> {'☐ Approved ☐ Approved with Modification ☐ Not Approved'}</Text>
        <Text style={{ marginBottom: 20 }}>● <Text style={styles.boldText}>Remarks (if any):</Text></Text>
        
        <View style={styles.facultyRow}>
          <Text style={[styles.boldText, { width: '50%' }]}>Faculty Signature: ______________________</Text>
          <Text style={[styles.boldText, { width: '50%' }]}>Date: ______________________</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Bottom of Form</Text>
      </View>
    </Page>
  </Document>
);
