module.exports = grammar({
  name: 'sv',

  rules: {
    library_text: $ => repeat(
      $.library_description,
    ),

    library_description: $ => choice(
      $.library_declaration,
      $.include_statement,
      // TODO: config_declaration
      // $.config_declaration,
      ';',
    ),

    library_declaration: $ => seq(
      'library',
      $.library_identifier,
      $.file_path_spec,
      repeat(
        seq(
          ',',
          $.file_path_spec,
        )
      ),
    ),

    include_statement: $ => seq(
      'include',
      $.file_path_spec,
      ';',
    ),
  }
});
