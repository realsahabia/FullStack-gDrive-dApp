const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DgdriveModule", (m) => {

  const dgdrive = m.contract("Dgdrive");

  return { dgdrive };
});
