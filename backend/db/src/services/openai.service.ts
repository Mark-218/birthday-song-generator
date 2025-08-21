import OpenAI from 'openai';

const getPronouns = (gender: 'male' | 'female') => {
  return gender === 'male'
    ? { subj: 'he', obj: 'him', poss: 'his' }
    : { subj: 'she', obj: 'her', poss: 'her' };
};

export async function generateLyrics({
  receiver_name,
  gender,
  genre,
}: {
  receiver_name: string;
  gender: 'male' | 'female';
  genre: string;
}) {
  const key = process.env.OPENAI_API_KEY;
  const pron = getPronouns(gender);

  const prompt = `
Wish a happy birthday to ${receiver_name}.
Write 16 lines of a ${genre} style birthday song.

Rules you must follow strictly:
- "Happy birthday" must appear at least twice.
- Each line must rhyme, use simple short words.
- Each line must have max 8 words (≤40 chars).
- Lyrics must be unique every single time.
- No references to trademarks, brands, or songs.
- Only use ${receiver_name}'s name, no other names/places.
- No offensive, sensitive, or inappropriate content.
- Keep it fun, joyful, and easy to sing.
Use ${pron.subj}/${pron.obj}/${pron.poss} pronouns where needed.
Return only the 16 lines of lyrics.
`;

  if (!key) {
    // Mock fallback (used if no OpenAI key is set)
    return [
      `${genre} vibes for ${receiver_name}!`,
      `Verse 1: It's your day, ${receiver_name}, let the candles glow,`,
      `Friends all around, let the good times flow.`,
      `Chorus: Happy birthday to ${receiver_name}, we all sing for ${pron.obj},`,
      `Make a wish tonight — may all dreams be ${pron.poss}.`,
      `Verse 2: Laughter in the air and memories to keep,`,
      `Dance to the beat, feel it in your feet.`,
      `Chorus: Happy birthday to ${receiver_name}, we all sing for ${pron.obj}...`,
    ].join('\n');
  }

  const client = new OpenAI({ apiKey: key });

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini', // you can switch to 'gpt-3.5-turbo' if needed
    messages: [
      { role: 'system', content: 'You are a creative lyricist.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.9,
    max_tokens: 400,
  });

  const text =
    response.choices?.[0]?.message?.content?.trim() ||
    'Could not generate lyrics.';
  return text;
}
