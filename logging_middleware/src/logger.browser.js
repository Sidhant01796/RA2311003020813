export const Log = async (stack, level, packageName, message) => {
  try {
    console.log('Browser log:', { stack, level, packageName, message });
  } catch (error) {
    console.error('Browser logging failed:', error);
  }
};
