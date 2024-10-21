import React, { useState } from 'react';
import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { Heading, SectionList, Text, VStack } from 'native-base';

// Interface para cada seção de exercícios
interface ExerciseSection {
  title: string;
  data: string[];
}

export function History() {
  const [exercises, setExercises] = useState<ExerciseSection[]>([
    {
      title: '26.08.23',
      data: [
        'Remada inclinada com halteres',
        'Remada unilateral com halteres',
        'Remada curvada com halteres',
      ],
    },
    {
      title: '27.08.23',
      data: [
        'Remada alta com halteres',
        'Elevação lateral inclinada',
        'Puxada frontal com halteres',
      ],
    },
    {
      title: '28.08.23',
      data: [
        'Remada com halteres e rotação externa',
        'Levantamento terra com halteres',
        'Encolhimento de ombros com halteres',
        'Superman com halteres',
      ],
    },
  ]);

  return (
    <VStack flex={1}>
      {/* Componente do cabeçalho da tela */}
      <ScreenHeader title="Histórico" />

      {/* Lista de seções */}
      <SectionList
        sections={exercises}
        keyExtractor={(item, index) => item + index}
        px={8}
        renderItem={({ item }) => <HistoryCard title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            color={'gray.200'}
            textAlign={'center'}
            fontSize={'md'}
            mt={10}
            mb={3}
          >
            {title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length
            ? {}
            : {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }
        }
        ListEmptyComponent={() => (
          <>
            <Text color={'gray.200'}>Você ainda não fez nada,</Text>
            <Text color={'gray.200'}>Bora malhar???</Text>
          </>
        )}
      />
    </VStack>
  );
}
