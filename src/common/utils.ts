import * as bcrypt from 'bcrypt';

export function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];
  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: string | undefined,
  hash: string | undefined,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

/**
 *
 * @param age
 * @returns {}
 */
export function getYearTimestamps(age: number): { start: string; end: string } {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const startDate = new Date(Date.UTC(birthYear, 0, 1, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(birthYear, 11, 31, 23, 59, 59, 999));

  const formatDate = (date: Date): string => {
    return date.toISOString().replace('T', ' ').replace('Z', '');
  };

  const startTimestamp = formatDate(startDate);
  const endTimestamp = formatDate(endDate);

  return {
    start: startTimestamp,
    end: endTimestamp,
  };
}
