#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 27
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 22
#define ALIAS_COUNT 0
#define TOKEN_COUNT 14
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 6
#define PRODUCTION_ID_COUNT 1

enum {
  anon_sym_timeunit = 1,
  anon_sym_SLASH = 2,
  anon_sym_SEMI = 3,
  anon_sym_timeprecision = 4,
  anon_sym_s = 5,
  anon_sym_ms = 6,
  anon_sym_us = 7,
  anon_sym_ns = 8,
  anon_sym_ps = 9,
  anon_sym_fs = 10,
  anon_sym_DOT = 11,
  anon_sym__ = 12,
  sym_decimal_digit = 13,
  sym_source_text = 14,
  sym_timeunits_declaration = 15,
  sym_time_literal = 16,
  sym_time_unit = 17,
  sym_fixed_point_number = 18,
  sym_unsigned_number = 19,
  aux_sym_timeunits_declaration_repeat1 = 20,
  aux_sym_unsigned_number_repeat1 = 21,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_timeunit] = "timeunit",
  [anon_sym_SLASH] = "/",
  [anon_sym_SEMI] = ";",
  [anon_sym_timeprecision] = "timeprecision",
  [anon_sym_s] = "s",
  [anon_sym_ms] = "ms",
  [anon_sym_us] = "us",
  [anon_sym_ns] = "ns",
  [anon_sym_ps] = "ps",
  [anon_sym_fs] = "fs",
  [anon_sym_DOT] = ".",
  [anon_sym__] = "_",
  [sym_decimal_digit] = "decimal_digit",
  [sym_source_text] = "source_text",
  [sym_timeunits_declaration] = "timeunits_declaration",
  [sym_time_literal] = "time_literal",
  [sym_time_unit] = "time_unit",
  [sym_fixed_point_number] = "fixed_point_number",
  [sym_unsigned_number] = "unsigned_number",
  [aux_sym_timeunits_declaration_repeat1] = "timeunits_declaration_repeat1",
  [aux_sym_unsigned_number_repeat1] = "unsigned_number_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_timeunit] = anon_sym_timeunit,
  [anon_sym_SLASH] = anon_sym_SLASH,
  [anon_sym_SEMI] = anon_sym_SEMI,
  [anon_sym_timeprecision] = anon_sym_timeprecision,
  [anon_sym_s] = anon_sym_s,
  [anon_sym_ms] = anon_sym_ms,
  [anon_sym_us] = anon_sym_us,
  [anon_sym_ns] = anon_sym_ns,
  [anon_sym_ps] = anon_sym_ps,
  [anon_sym_fs] = anon_sym_fs,
  [anon_sym_DOT] = anon_sym_DOT,
  [anon_sym__] = anon_sym__,
  [sym_decimal_digit] = sym_decimal_digit,
  [sym_source_text] = sym_source_text,
  [sym_timeunits_declaration] = sym_timeunits_declaration,
  [sym_time_literal] = sym_time_literal,
  [sym_time_unit] = sym_time_unit,
  [sym_fixed_point_number] = sym_fixed_point_number,
  [sym_unsigned_number] = sym_unsigned_number,
  [aux_sym_timeunits_declaration_repeat1] = aux_sym_timeunits_declaration_repeat1,
  [aux_sym_unsigned_number_repeat1] = aux_sym_unsigned_number_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_timeunit] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_SLASH] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_SEMI] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_timeprecision] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_s] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_ms] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_us] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_ns] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_ps] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_fs] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DOT] = {
    .visible = true,
    .named = false,
  },
  [anon_sym__] = {
    .visible = true,
    .named = false,
  },
  [sym_decimal_digit] = {
    .visible = true,
    .named = true,
  },
  [sym_source_text] = {
    .visible = true,
    .named = true,
  },
  [sym_timeunits_declaration] = {
    .visible = true,
    .named = true,
  },
  [sym_time_literal] = {
    .visible = true,
    .named = true,
  },
  [sym_time_unit] = {
    .visible = true,
    .named = true,
  },
  [sym_fixed_point_number] = {
    .visible = true,
    .named = true,
  },
  [sym_unsigned_number] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_timeunits_declaration_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_unsigned_number_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 26,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(21);
      if (lookahead == '.') ADVANCE(32);
      if (lookahead == '/') ADVANCE(23);
      if (lookahead == ';') ADVANCE(24);
      if (lookahead == '_') ADVANCE(33);
      if (lookahead == 'f') ADVANCE(14);
      if (lookahead == 'm') ADVANCE(15);
      if (lookahead == 'n') ADVANCE(16);
      if (lookahead == 'p') ADVANCE(17);
      if (lookahead == 's') ADVANCE(26);
      if (lookahead == 't') ADVANCE(4);
      if (lookahead == 'u') ADVANCE(18);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(34);
      END_STATE();
    case 1:
      if (lookahead == 'c') ADVANCE(7);
      END_STATE();
    case 2:
      if (lookahead == 'e') ADVANCE(12);
      END_STATE();
    case 3:
      if (lookahead == 'e') ADVANCE(1);
      END_STATE();
    case 4:
      if (lookahead == 'i') ADVANCE(8);
      END_STATE();
    case 5:
      if (lookahead == 'i') ADVANCE(20);
      END_STATE();
    case 6:
      if (lookahead == 'i') ADVANCE(11);
      END_STATE();
    case 7:
      if (lookahead == 'i') ADVANCE(19);
      END_STATE();
    case 8:
      if (lookahead == 'm') ADVANCE(2);
      END_STATE();
    case 9:
      if (lookahead == 'n') ADVANCE(25);
      END_STATE();
    case 10:
      if (lookahead == 'n') ADVANCE(5);
      END_STATE();
    case 11:
      if (lookahead == 'o') ADVANCE(9);
      END_STATE();
    case 12:
      if (lookahead == 'p') ADVANCE(13);
      if (lookahead == 'u') ADVANCE(10);
      END_STATE();
    case 13:
      if (lookahead == 'r') ADVANCE(3);
      END_STATE();
    case 14:
      if (lookahead == 's') ADVANCE(31);
      END_STATE();
    case 15:
      if (lookahead == 's') ADVANCE(27);
      END_STATE();
    case 16:
      if (lookahead == 's') ADVANCE(29);
      END_STATE();
    case 17:
      if (lookahead == 's') ADVANCE(30);
      END_STATE();
    case 18:
      if (lookahead == 's') ADVANCE(28);
      END_STATE();
    case 19:
      if (lookahead == 's') ADVANCE(6);
      END_STATE();
    case 20:
      if (lookahead == 't') ADVANCE(22);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_timeunit);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_SLASH);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_SEMI);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_timeprecision);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_s);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_ms);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(anon_sym_us);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(anon_sym_ns);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(anon_sym_ps);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(anon_sym_fs);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(anon_sym_DOT);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(anon_sym__);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(sym_decimal_digit);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 0},
  [16] = {.lex_state = 0},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 0},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_timeunit] = ACTIONS(1),
    [anon_sym_SLASH] = ACTIONS(1),
    [anon_sym_SEMI] = ACTIONS(1),
    [anon_sym_timeprecision] = ACTIONS(1),
    [anon_sym_s] = ACTIONS(1),
    [anon_sym_ms] = ACTIONS(1),
    [anon_sym_us] = ACTIONS(1),
    [anon_sym_ns] = ACTIONS(1),
    [anon_sym_ps] = ACTIONS(1),
    [anon_sym_fs] = ACTIONS(1),
    [anon_sym_DOT] = ACTIONS(1),
    [anon_sym__] = ACTIONS(1),
    [sym_decimal_digit] = ACTIONS(1),
  },
  [1] = {
    [sym_source_text] = STATE(21),
    [sym_timeunits_declaration] = STATE(22),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_timeunit] = ACTIONS(5),
    [anon_sym_timeprecision] = ACTIONS(7),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 3,
    STATE(2), 1,
      aux_sym_unsigned_number_repeat1,
    ACTIONS(11), 2,
      anon_sym__,
      sym_decimal_digit,
    ACTIONS(9), 7,
      anon_sym_s,
      anon_sym_ms,
      anon_sym_us,
      anon_sym_ns,
      anon_sym_ps,
      anon_sym_fs,
      anon_sym_DOT,
  [17] = 3,
    STATE(4), 1,
      aux_sym_unsigned_number_repeat1,
    ACTIONS(16), 2,
      anon_sym__,
      sym_decimal_digit,
    ACTIONS(14), 7,
      anon_sym_s,
      anon_sym_ms,
      anon_sym_us,
      anon_sym_ns,
      anon_sym_ps,
      anon_sym_fs,
      anon_sym_DOT,
  [34] = 3,
    STATE(2), 1,
      aux_sym_unsigned_number_repeat1,
    ACTIONS(20), 2,
      anon_sym__,
      sym_decimal_digit,
    ACTIONS(18), 7,
      anon_sym_s,
      anon_sym_ms,
      anon_sym_us,
      anon_sym_ns,
      anon_sym_ps,
      anon_sym_fs,
      anon_sym_DOT,
  [51] = 3,
    ACTIONS(24), 1,
      anon_sym_DOT,
    STATE(17), 1,
      sym_time_unit,
    ACTIONS(22), 6,
      anon_sym_s,
      anon_sym_ms,
      anon_sym_us,
      anon_sym_ns,
      anon_sym_ps,
      anon_sym_fs,
  [66] = 2,
    STATE(17), 1,
      sym_time_unit,
    ACTIONS(22), 6,
      anon_sym_s,
      anon_sym_ms,
      anon_sym_us,
      anon_sym_ns,
      anon_sym_ps,
      anon_sym_fs,
  [78] = 1,
    ACTIONS(26), 6,
      anon_sym_s,
      anon_sym_ms,
      anon_sym_us,
      anon_sym_ns,
      anon_sym_ps,
      anon_sym_fs,
  [87] = 4,
    ACTIONS(28), 1,
      sym_decimal_digit,
    STATE(5), 1,
      sym_unsigned_number,
    STATE(6), 1,
      sym_fixed_point_number,
    STATE(20), 1,
      sym_time_literal,
  [100] = 4,
    ACTIONS(28), 1,
      sym_decimal_digit,
    STATE(5), 1,
      sym_unsigned_number,
    STATE(6), 1,
      sym_fixed_point_number,
    STATE(12), 1,
      sym_time_literal,
  [113] = 4,
    ACTIONS(28), 1,
      sym_decimal_digit,
    STATE(5), 1,
      sym_unsigned_number,
    STATE(6), 1,
      sym_fixed_point_number,
    STATE(25), 1,
      sym_time_literal,
  [126] = 4,
    ACTIONS(28), 1,
      sym_decimal_digit,
    STATE(5), 1,
      sym_unsigned_number,
    STATE(6), 1,
      sym_fixed_point_number,
    STATE(23), 1,
      sym_time_literal,
  [139] = 3,
    ACTIONS(30), 1,
      anon_sym_SLASH,
    ACTIONS(32), 1,
      anon_sym_SEMI,
    STATE(13), 1,
      aux_sym_timeunits_declaration_repeat1,
  [149] = 3,
    ACTIONS(30), 1,
      anon_sym_SLASH,
    ACTIONS(34), 1,
      anon_sym_SEMI,
    STATE(14), 1,
      aux_sym_timeunits_declaration_repeat1,
  [159] = 3,
    ACTIONS(36), 1,
      anon_sym_SLASH,
    ACTIONS(39), 1,
      anon_sym_SEMI,
    STATE(14), 1,
      aux_sym_timeunits_declaration_repeat1,
  [169] = 2,
    ACTIONS(41), 1,
      ts_builtin_sym_end,
    ACTIONS(43), 1,
      anon_sym_timeprecision,
  [176] = 1,
    ACTIONS(45), 2,
      anon_sym_SLASH,
      anon_sym_SEMI,
  [181] = 1,
    ACTIONS(47), 2,
      anon_sym_SLASH,
      anon_sym_SEMI,
  [186] = 2,
    ACTIONS(28), 1,
      sym_decimal_digit,
    STATE(7), 1,
      sym_unsigned_number,
  [193] = 2,
    ACTIONS(41), 1,
      ts_builtin_sym_end,
    ACTIONS(43), 1,
      anon_sym_timeunit,
  [200] = 1,
    ACTIONS(39), 2,
      anon_sym_SLASH,
      anon_sym_SEMI,
  [205] = 1,
    ACTIONS(49), 1,
      ts_builtin_sym_end,
  [209] = 1,
    ACTIONS(51), 1,
      ts_builtin_sym_end,
  [213] = 1,
    ACTIONS(53), 1,
      anon_sym_SEMI,
  [217] = 1,
    ACTIONS(55), 1,
      ts_builtin_sym_end,
  [221] = 1,
    ACTIONS(57), 1,
      anon_sym_SEMI,
  [225] = 1,
    ACTIONS(59), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 17,
  [SMALL_STATE(4)] = 34,
  [SMALL_STATE(5)] = 51,
  [SMALL_STATE(6)] = 66,
  [SMALL_STATE(7)] = 78,
  [SMALL_STATE(8)] = 87,
  [SMALL_STATE(9)] = 100,
  [SMALL_STATE(10)] = 113,
  [SMALL_STATE(11)] = 126,
  [SMALL_STATE(12)] = 139,
  [SMALL_STATE(13)] = 149,
  [SMALL_STATE(14)] = 159,
  [SMALL_STATE(15)] = 169,
  [SMALL_STATE(16)] = 176,
  [SMALL_STATE(17)] = 181,
  [SMALL_STATE(18)] = 186,
  [SMALL_STATE(19)] = 193,
  [SMALL_STATE(20)] = 200,
  [SMALL_STATE(21)] = 205,
  [SMALL_STATE(22)] = 209,
  [SMALL_STATE(23)] = 213,
  [SMALL_STATE(24)] = 217,
  [SMALL_STATE(25)] = 221,
  [SMALL_STATE(26)] = 225,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_text, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [9] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_unsigned_number_repeat1, 2),
  [11] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_unsigned_number_repeat1, 2), SHIFT_REPEAT(2),
  [14] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unsigned_number, 1),
  [16] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [18] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_unsigned_number, 2),
  [20] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [22] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [24] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [26] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fixed_point_number, 3),
  [28] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [30] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [32] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [34] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [36] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_timeunits_declaration_repeat1, 2), SHIFT_REPEAT(8),
  [39] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_timeunits_declaration_repeat1, 2),
  [41] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_timeunits_declaration, 3),
  [43] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [45] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_time_unit, 1),
  [47] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_time_literal, 2),
  [49] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_text, 1),
  [53] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [55] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_timeunits_declaration, 4),
  [57] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [59] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_timeunits_declaration, 6),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_sv(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
